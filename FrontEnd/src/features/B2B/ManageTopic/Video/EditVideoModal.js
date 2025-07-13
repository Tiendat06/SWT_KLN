import {KLNModal, KLNButton} from "~/components";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {useState, useEffect, useRef} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Card} from "primereact/card";
import {topicService} from "~/services/TopicService";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createVideo.module.scss";
import solar_upload_icon_1 from "~/assets/img/icon/solar_upload-linear.png";
import {BROWSER_CANNOT_READ_IMG} from "~/utils/ErrorMessage";
import {showToast} from "~/utils/Toast";
import {
    updateTopicVideoAction
} from '~/store/B2B/ManageTopic/actions';

const EditVideoModal = () => {
    const {
        editVideoModalVisible, setEditVideoModalVisible,
        editingVideo, setIsUpdated, dispatch
    } = useManageTopicContext();

    const [formData, setFormData] = useState({
        capture: '',
        file: null
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useRef(null);
    
    const mediaType = 'video';
    const acceptedFileTypes = '.mp4,.avi,.mov,.wmv,.mkv,.webm';

    useEffect(() => {
        if (editingVideo) {
            setFormData({
                capture: editingVideo.capture || '',
                file: null
            });
            setPreviewUrl(editingVideo.videoLink || '');
        }
    }, [editingVideo]);

    const handleClose = () => {
        setEditVideoModalVisible(false);
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
            
            // Check file size (2GB limit)
            const maxSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
            if (file.size > maxSize) {
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: `Tải ${mediaType} lỗi`,
                    detail: `Kích thước file vượt quá giới hạn 2GB. File hiện tại: ${(file.size / (1024 * 1024 * 1024)).toFixed(2)}GB`
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
            // Kiểm tra loại file
            const allowedTypes = acceptedFileTypes.split(',').map(type => type.replace('.', ''));
            const fileType = files[0].name.split('.').pop().toLowerCase();
            
            if (allowedTypes.includes(fileType)) {
                handleFile(files);
            } else {
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: `Tải ${mediaType} lỗi`,
                    detail: `Định dạng file không được hỗ trợ. Vui lòng chọn file ${acceptedFileTypes}`
                })
            }
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
        try {
            setIsSubmitting(true);
            
            const updateData = {
                id: editingVideo.id,
                capture: formData.capture,
                videoFile: formData.file // Có thể null nếu không thay đổi video
            };
            
            const result = await topicService.updateVideoService(updateData);
            if (result && result.data) {
                // Update store with updated video
                dispatch(updateTopicVideoAction(result.data));
            }
            
            showToast({
                toastRef: toast,
                severity: 'success',
                summary: `Cập nhật ${mediaType}`,
                detail: `Cập nhật ${mediaType} thành công.`
            });
            
            setIsUpdated(prev => !prev);
            handleClose();
            
        } catch (error) {
            console.error('Error updating video:', error);
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: `Cập nhật ${mediaType}`,
                detail: `Lỗi khi cập nhật ${mediaType}. Vui lòng thử lại.`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KLNModal
            visible={editVideoModalVisible}
            setVisible={setEditVideoModalVisible}
            modalHeader={`Sửa thông tin ${mediaType}`}
            size="xl"
            labelSave={isSubmitting ? 'Đang lưu...' : 'Lưu'}
            labelCancel="Hủy"
            btnSaveOnClick={handleSubmit}
            btnCancelOnClick={handleClose}
            isLoading={isSubmitting}
            buttonSaveOptions={5}
            buttonCloseOptions={4}
            footerStyle={{display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem'}}
            buttonSaveStyle={{minWidth: '100px'}}
            buttonCancelStyle={{minWidth: '100px'}}
        >
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải {mediaType} mới lên (tùy chọn)</h6>}>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={clsx(styles["create-video__add--video"])}
                        >
                            <div className="text-center">
                                <img src={solar_upload_icon_1} alt="Icon upload"/>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kéo thả tệp tại đây</p>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">
                                    Kích thước tối đa 2GB với định dạng mp4, avi, ...
                                </p>
                                <KLNButton
                                    options={6}
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
                        }} className={clsx(styles["create-video__preview--video"])}>
                            <div style={{
                                height: "60%"
                            }} className={clsx(styles['create-video__preview--video__src'])}>
                                {previewUrl && (
                                    <video controls style={{width: '100%', height: '100%'}}>
                                        <source src={previewUrl} type="video/mp4"/>
                                    </video>
                                )}
                            </div>
                            <div style={{
                                height: "40%"
                            }} className={clsx(styles["create-video__preview--video__content"], 'bg-light')}>
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

export default EditVideoModal; 