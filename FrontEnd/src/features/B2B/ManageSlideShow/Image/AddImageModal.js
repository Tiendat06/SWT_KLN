import React, { useState, useEffect } from 'react';
import { KLNModal, KLNButton } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Card} from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss";
import solar_upload_icon_1 from "~/assets/img/icon/solar_upload-linear.png";
import {slideShowService} from "~/services/SlideShowService";
import {addSlideshowImageAction, setSlideshowDetailAction} from '~/store/B2B/ManageSlideShow/actions';
import {showToast} from "~/utils/Toast";
import { useAppContext } from "~/context/AppContext";
import MediaType from '~/enum/MediaType/MediaType';
import SlideShowType from '~/enum/SlideShowType/SlideShowType';
import { TEST_USER_ID } from '~/utils/Constansts';

const AddImageModal = ({ slideShowId }) => {
    const {
        addImageModalVisible, setAddImageModalVisible,
        addTempImage, setIsUpdated, dispatch, slideshowDetail,
        isUpdated
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



    const handleClose = () => {
        setAddImageModalVisible(false);
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
                alert(`Định dạng file không được hỗ trợ. Vui lòng chọn file ${acceptedFileTypes}`);
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                file: file
            }));


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
        }
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            
            if (!formData.file) {
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: `Thêm ${mediaType}`,
                    detail: 'Vui lòng chọn file ảnh trước khi lưu!'
                });
                return;
            }
            
            if (slideShowId) {
                try {
                    const createData = {
                        capture: formData.capture,
                        imageFile: formData.file
                    };
                    
                    const result = await slideShowService.addSlideImageInSpecificSlideShowService(
                        slideShowId,
                        [createData],
                        MediaType.TDTMemorial, 
                        SlideShowType.ExhibitionHouse,
                        TEST_USER_ID
                    );
                    
                    if (result && result.data) {
                        dispatch(addSlideshowImageAction(result.data));
                        
                        if (slideshowDetail) {
                            const updatedDetail = {
                                ...slideshowDetail,
                                slideImage: [...(slideshowDetail.slideImage || []), result.data]
                            };
                            dispatch(setSlideshowDetailAction(updatedDetail));
                        }
                        
                        setIsUpdated(prev => !prev);
                        
                        showToast({
                            toastRef: toast,
                            severity: 'success',
                            summary: `Thêm ${mediaType}`,
                            detail: `Thêm ${mediaType} thành công!`
                        });
                        
                        handleClose();
                    } else {
                        const errorMessage = result?.message || 'API response invalid';
                        throw new Error(errorMessage);
                    }
                } catch (apiError) {
                    console.error('Error adding image:', apiError);
                    const errorMessage = apiError?.message || 'Có lỗi xảy ra khi thêm ảnh';
                    showToast({
                        toastRef: toast,
                        severity: 'error',
                        summary: `Thêm ${mediaType}`,
                        detail: errorMessage
                    });
                }
            } else {
                const tempId = Date.now() + Math.random();
                const imageWithId = {
                    id: tempId,
                    capture: formData.capture,
                    file: formData.file,
                    imageLink: previewUrl
                };
                
                addTempImage(imageWithId);
                
                // Trigger reload để cập nhật UI
                setIsUpdated(prev => {
                    console.log('AddImageModal - Triggering reload (temp), prev:', prev, 'new:', !prev);
                    return !prev;
                });
                
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: `Thêm ${mediaType}`,
                    detail: `Thêm ${mediaType} thành công!`
                });
                
                handleClose();
            }
            
        } catch (error) {
            console.error('Error adding media:', error);
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: `Thêm ${mediaType}`,
                detail: `Lỗi khi thêm ${mediaType}. Vui lòng thử lại.`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KLNModal
            visible={addImageModalVisible}
            setVisible={setAddImageModalVisible}
            modalHeader={`Thêm ${mediaType} vào nhà trưng bày`}
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
            buttonSaveDisabled={!formData.file || !formData.capture.trim() || isSubmitting}
        >
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải {mediaType} lên</h6>}>
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
                                    fileInputId="slideshowImageId"
                                    onHandleFileChange={handleUpload}
                                    style={{
                                        cursor: "pointer",
                                        marginTop: 10
                                    }}
                                >
                                    Tải {mediaType} lên
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

export default AddImageModal; 