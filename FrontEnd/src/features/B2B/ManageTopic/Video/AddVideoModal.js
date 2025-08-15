import {KLNModal, KLNButton} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Card} from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createVideo.module.scss";
import solar_upload_icon_1 from "~/assets/img/icon/solar_upload-linear.png";
import {topicService} from "~/services/TopicService";
import {
    addTopicVideoAction
} from '~/store/B2B/ManageTopic/actions';
import { showToast } from '~/utils/Toast';
import { useAppContext } from '~/context/AppContext';
import MediaType from "~/enum/MediaType/MediaType";
import { TEST_USER_ID } from "~/utils/Constansts";

const AddVideoModal = ({topicId}) => {
    const {
        addVideoModalVisible, setAddVideoModalVisible,
        addTempVideo, setIsUpdated, dispatch
    } = useManageTopicContext();

    const { toast } = useAppContext();

    const [formData, setFormData] = useState({
        capture: '',
        file: null
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mediaType = 'video';
    const acceptedFileTypes = '.mp4,.avi,.mov,.wmv,.mkv,.webm';

    const handleClose = () => {
        setAddVideoModalVisible(false);
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
                alert(`Kích thước file vượt quá giới hạn 2GB. File hiện tại: ${(file.size / (1024 * 1024 * 1024)).toFixed(2)}GB`);
                return;
            }
            
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
        }
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            
            const mediaData = {
                capture: formData.capture,
                videoFile: formData.file,
                preview: previewUrl
            };
            
            if (topicId) {
                // Thêm vào topic hiện có
                try {
                    const result = await topicService.addTopicMediaService({
                        topicId,
                        mediaTypeId: MediaType.None,
                        userId: TEST_USER_ID,
                        images: [],
                        videos: [ { capture: mediaData.capture, videoFile: mediaData.videoFile } ]
                    });
                    
                    if (result && result.data) {
                        // API thành công - sử dụng data từ server
                        dispatch(addTopicVideoAction(result.data));
                        alert(`Thêm ${mediaType} thành công!`);
                    } else {
                        const errorMessage = result?.message || 'API response invalid';
                        throw new Error(errorMessage);
                    }
                } catch (apiError) {
                    console.error('Error adding video:', apiError);
                    const errorMessage = apiError?.message || 'Có lỗi xảy ra khi thêm video';
                    showToast({
                        toastRef: toast,
                        severity: 'error',
                        summary: `Thêm ${mediaType}`,
                        detail: errorMessage
                    });
                }
                
                setIsUpdated(prev => !prev);
            } else {
                // Thêm vào danh sách temp trong CreateTopicModal
                const tempId = Date.now() + Math.random();
                const videoWithId = {
                    id: tempId,
                    ...mediaData,
                    videoLink: previewUrl
                };
                
                // Thêm vào context thông qua reducer
                addTempVideo(videoWithId);
                
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
            alert(`Lỗi khi thêm ${mediaType}. Vui lòng thử lại.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KLNModal
            visible={addVideoModalVisible}
            setVisible={setAddVideoModalVisible}
            modalHeader={`Thêm ${mediaType} vào chuyên đề`}
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
        >
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải {mediaType} lên</h6>}>
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
                                    options={KLNButtonEnum.blackBtn}
                                    hasFileInput={true}
                                    acceptedFileType={acceptedFileTypes}
                                    fileInputId="topic-add-video-input" // Custom ID để tránh conflicts
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

export default AddVideoModal; 