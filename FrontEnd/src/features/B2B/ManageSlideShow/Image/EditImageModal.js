import React, { useState, useEffect, useRef } from 'react';
import { KLNModal, KLNButton } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Card} from "primereact/card";
import {slideShowService} from "~/services/SlideShowService";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss";
import solar_upload_icon_1 from "~/assets/img/icon/solar_upload-linear.png";
import {BROWSER_CANNOT_READ_IMG} from "~/utils/ErrorMessage";
import {showToast} from "~/utils/Toast";
import {updateSlideshowImageAction, setSlideshowDetailAction} from '~/store/B2B/ManageSlideShow/actions';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import { useAppContext } from "~/context/AppContext";
import MediaType from '~/enum/MediaType/MediaType';
import { TEST_USER_ID } from '~/utils/Constansts';
import SlideShowType from '~/enum/SlideShowType/SlideShowType';

const EditImageModal = ({ slideShowId }) => {
    const {
        editImageModalVisible, setEditImageModalVisible,
        selectedSlideshowImage, setIsUpdated, dispatch, slideshowDetail
    } = useManageSlideshowContext();
    const { toast } = useAppContext();

    const [formData, setFormData] = useState({
        capture: '',
        file: null
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const mediaType = 'ảnh';
    const acceptedFileTypes = '.jpg,.jpeg,.png,.gif,.bmp,.webp';

    useEffect(() => {
        if (selectedSlideshowImage) {
            setFormData({
                capture: selectedSlideshowImage.capture || '',
                file: null
            });
            setPreviewUrl(selectedSlideshowImage.imageLink || '');
        }
    }, [selectedSlideshowImage]);

    const handleClose = () => {
        setEditImageModalVisible(false);
        setFormData({
            capture: '',
            file: null
        });
        setPreviewUrl('');
        setIsSubmitting(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFile = (files) => {
        if (files.length > 0) {
            const file = files[0];
            
            // Check file type
            const allowedTypes = acceptedFileTypes.split(',').map(type => type.replace('.', ''));
            const fileType = file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileType)) {
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: `Tải ${mediaType} lỗi`,
                    detail: `Định dạng file không được hỗ trợ. Vui lòng chọn file ${acceptedFileTypes}`
                });
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                file: file
            }));

            // Tạo preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files);
        }
    };

    const handleUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files);
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: `Tải ${mediaType} lỗi`,
                detail: BROWSER_CANNOT_READ_IMG
            });
        }
    };

    const handleSubmit = async () => {
        if (!formData.capture.trim()) {
            showToast({ 
                toastRef: toast, 
                severity: 'error', 
                summary: 'Lỗi', 
                detail: 'Vui lòng nhập tên nội dung!' 
            });
            return;
        }
        
        setIsSubmitting(true);
        try {
            const updateData = {
                id: selectedSlideshowImage.id,
                capture: formData.capture
            };
            
            if (formData.file) {
                updateData.imageFile = formData.file;
            }
            
            try {
                // Gọi API cập nhật image
                const result = await slideShowService.updateSlideshowImageService(
                    slideShowId, 
                    [updateData], 
                    MediaType.TDTMemorial, 
                    SlideShowType.ExhibitionHouse, 
                    TEST_USER_ID
                );
                
                if (result && result.data) {
                    // API thành công - cập nhật store với data từ server
                    dispatch(updateSlideshowImageAction(result.data));
                    
                    // Cập nhật slideshowDetail để trigger re-pagination
                    if (slideshowDetail) {
                        const updatedDetail = {
                            ...slideshowDetail,
                            slideImage: slideshowDetail.slideImage.map(img => 
                                img.id === result.data.id ? result.data : img
                            )
                        };
                        dispatch(setSlideshowDetailAction(updatedDetail));
                    }
                    
                    showToast({
                        toastRef: toast,
                        severity: 'success',
                        summary: `Cập nhật ${mediaType}`,
                        detail: `Cập nhật ${mediaType} thành công.`
                    });
                    
                    // Chỉ đóng modal và cập nhật khi thành công
                    setIsUpdated(prev => !prev);
                    handleClose();
                } else if (result && result.status && result.message && !result.data) {
                    console.error('API Error Details:', result);
                    showToast({ 
                        toastRef: toast, 
                        severity: 'error', 
                        summary: 'Lỗi API', 
                        detail: `${result.status}: ${result.message || 'Unknown error'}` 
                    });
                    throw new Error(`API Error ${result.status}: ${result.message || 'Unknown error'}`);
                } else {
                    const errorMessage = result?.message || 'API response invalid';
                    throw new Error(errorMessage);
                }
            } catch (error) {
                console.error('Error updating image:', error);
                const errorMessage = error?.message || 'Có lỗi xảy ra khi cập nhật ảnh';
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: `Cập nhật ${mediaType}`,
                    detail: errorMessage
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KLNModal
            visible={editImageModalVisible}
            setVisible={setEditImageModalVisible}
            modalHeader={`Sửa thông tin ${mediaType}`}
            size="xl"
            labelSave={isSubmitting ? 'Đang lưu...' : 'Lưu'}
            labelCancel="Hủy"
            btnSaveOnClick={handleSubmit}
            btnCancelOnClick={handleClose}
            isLoading={isSubmitting}
            buttonSaveOptions={KLNButtonEnum.dangerBtn}
            buttonCloseOptions={KLNButtonEnum.whiteBtn}
            footerStyle={{display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem'}}
            buttonSaveStyle={{minWidth: '100px'}}
            buttonCancelStyle={{minWidth: '100px'}}
            buttonSaveDisabled={!formData.capture || isSubmitting}
        >
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải {mediaType} mới lên (tùy chọn)</h6>}>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={clsx(styles["create-image__add--image"])}
                        >
                            <div className="text-center">
                                <img src={solar_upload_icon_1} alt="Icon upload"/>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kéo thả tệp tại đây</p>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">
                                    Kích thước tối đa 100MB với định dạng jpg, png, ...
                                </p>
                                <KLNButton
                                    options={KLNButtonEnum.blackBtn}
                                    hasFileInput={true}
                                    acceptedFileType={acceptedFileTypes}
                                    onHandleFileChange={handleUpload}
                                    style={{
                                        cursor: "pointer",
                                        marginTop: 10
                                    }}
                                >
                                    Chọn {mediaType} mới
                                </KLNButton>
                            </div>
                        </div>
                    </Card>
                </div>
                
                <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                    <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước</h6>}>
                        <div style={{
                            height: 350
                        }} className={clsx(styles["create-image__preview--image"])}>
                            <div style={{
                                height: "60%"
                            }} className={clsx(styles['create-image__preview--image__src'])}>
                                {previewUrl && (
                                    <img src={previewUrl} alt="Xem trước" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                                )}
                            </div>
                            <div style={{
                                height: "40%"
                            }} className={clsx(styles["create-image__preview--image__content"], 'bg-light')}>
                                <h6 style={{
                                    fontWeight: 'bold'
                                }}>Nội dung:</h6>
                                <p title={formData?.capture}>{formData?.capture}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                
                <div className="col-lg-12 col-md-12 col-sm-12 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thông tin chi tiết</h5>
                    <Card className="w-100 card-details">
                        <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                            <label style={{
                                fontWeight: 'bold'
                            }} className="w-100 mb-2" htmlFor="capture">Tên nội dung *</label>
                            <InputTextarea
                                value={formData.capture}
                                onChange={(e) => handleInputChange('capture', e.target.value)}
                                className="w-100" placeholder="Nhập tên nội dung" rows={2} cols={30}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                            <label style={{
                                fontWeight: 'bold'
                            }} className="w-100 mb-2" htmlFor="calendar">Ngày cập nhật</label>
                            <Calendar disabled={true} className="w-100" id="calendar"
                                      value={new Date()} dateFormat="dd/mm/yy"
                                      showIcon/>
                        </div>
                    </Card>
                </div>
            </div>
        </KLNModal>
    );
};

export default EditImageModal; 