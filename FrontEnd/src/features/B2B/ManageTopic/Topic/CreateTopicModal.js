import React, {useState} from 'react';
import {TopicModal, KLNButton} from "~/components";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {InputText} from "primereact/inputtext";
import {faPlus, faTrash, faImage, faVideo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {topicService} from "~/services/TopicService";
import {
    addTopicAction
} from '~/store/B2B/ManageTopic/actions';
import {AddImageModal, AddVideoModal} from "~/features/B2B/ManageTopic";

const CreateTopicModal = () => {
    const {
        createTopicModalVisible, setCreateTopicModalVisible, setIsUpdated,
        setAddImageModalVisible, setAddVideoModalVisible,
        tempImages, tempVideos, removeTempImages, removeTempVideos, clearTempMedia,
        dispatch
    } = useManageTopicContext();

    const [formData, setFormData] = useState({
        capture: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const handleClose = () => {
        setCreateTopicModalVisible(false);
        setFormData({
            capture: '',
            description: ''
        });
        clearTempMedia();
        setSelectedImages([]);
        setSelectedVideos([]);
        setIsSubmitting(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddImage = () => {
        setAddImageModalVisible(true);
    };

    const handleAddVideo = () => {
        setAddVideoModalVisible(true);
    };

    const handleDeleteImages = () => {
        if (selectedImages.length > 0) {
            removeTempImages(selectedImages);
            setSelectedImages([]);
        }
    };

    const handleDeleteVideos = () => {
        if (selectedVideos.length > 0) {
            removeTempVideos(selectedVideos);
            setSelectedVideos([]);
        }
    };

    const handleImageSelection = (imageId, checked) => {
        setSelectedImages(prev => 
            checked 
                ? [...prev, imageId]
                : prev.filter(id => id !== imageId)
        );
    };

    const handleVideoSelection = (videoId, checked) => {
        setSelectedVideos(prev => 
            checked 
                ? [...prev, videoId]
                : prev.filter(id => id !== videoId)
        );
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            
            // Tạo topic với ảnh và video cùng lúc
            const topicData = {
                ...formData,
                images: tempImages,
                videos: tempVideos
            };
            
            const createResult = await topicService.createTopicWithMediaService(topicData);
            if (createResult && createResult.data) {
                // Update store with new topic
                dispatch(addTopicAction(createResult.data));
                console.log('Topic with media created successfully');
            }
            
            setIsUpdated(prev => !prev);
            handleClose();
            
        } catch (error) {
            console.error('Error creating topic with media:', error);
            try {
                const createResult = await topicService.createTopicService(formData);
                if (createResult && createResult.data?.topicId) {
                    const topicId = createResult.data.topicId;
                    
                    // Thêm ảnh
                    if (tempImages.length > 0) {
                        for (const image of tempImages) {
                            await topicService.addImageToTopicService(topicId, image);
                        }
                    }
                    
                    // Thêm video
                    if (tempVideos.length > 0) {
                        for (const video of tempVideos) {
                            await topicService.addVideoToTopicService(topicId, video);
                        }
                    }
                    
                    // Update store with new topic (including media)
                    const completeTopicData = {
                        ...createResult.data,
                        images: tempImages,
                        videos: tempVideos
                    };
                    dispatch(addTopicAction(completeTopicData));
                    console.log('Topic created and media added successfully');
                }
                
                setIsUpdated(prev => !prev);
                handleClose();
            } catch (fallbackError) {
                console.error('Error in fallback creation:', fallbackError);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.capture.trim() !== '';

    return (
        <>
        <TopicModal
            visible={createTopicModalVisible}
            onHide={handleClose}
            header="Thêm chuyên đề"
            style={{width: '800px'}}
            labelSave={isSubmitting ? 'Đang lưu...' : 'Lưu'}
            labelCancel="Hủy"
            btnSaveOnClick={handleSubmit}
            btnCancelOnClick={handleClose}
            disabled={!isFormValid || isSubmitting}
        >
            <div className="p-4">
                {/* Tên chuyên đề */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Tên chuyên đề *</label>
                    <InputText
                        value={formData.capture}
                        onChange={(e) => handleInputChange('capture', e.target.value)}
                        placeholder="Nhập nội dung..."
                        className="w-100"
                    />
                </div>

                {/* Ảnh Section */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0 font-weight-bold d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faImage} className="text-primary" />
                            Ảnh
                        </h6>
                        <div className="d-flex gap-2">
                            <KLNButton
                                options={5}
                                icon={faPlus}
                                onClick={handleAddImage}
                                style={{
                                    fontSize: '12px', 
                                    padding: '6px 12px',
                                    background: 'linear-gradient(135deg, #AD1E32 0%, #D22F27 100%)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 4px rgba(173, 30, 50, 0.2)'
                                }}
                                iconStyle={{marginLeft: '6px', fontSize: '10px'}}
                            >
                                Thêm
                            </KLNButton>
                            <KLNButton
                                options={4}
                                icon={faTrash}
                                onClick={handleDeleteImages}
                                disabled={selectedImages.length === 0}
                                style={{
                                    fontSize: '12px', 
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontWeight: '500'
                                }}
                                iconStyle={{marginLeft: '6px', fontSize: '10px'}}
                            >
                                Xóa
                            </KLNButton>
                        </div>
                    </div>
                    
                    <div className="border rounded p-3" style={{minHeight: '100px', maxHeight: '150px', overflowY: 'auto'}}>
                        {tempImages.length > 0 ? (
                            <div className="row">
                                {tempImages.map((image) => (
                                    <div key={image.id} className="col-12 mb-2">
                                        <div className="d-flex align-items-center gap-2 p-2 border rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedImages.includes(image.id)}
                                                onChange={(e) => handleImageSelection(image.id, e.target.checked)}
                                            />
                                            <img 
                                                src={image.imageLink || image.preview || '/placeholder-image.jpg'} 
                                                alt={image.capture}
                                                style={{width: '40px', height: '40px', objectFit: 'cover'}}
                                                className="rounded"
                                            />
                                            <span className="text-truncate" title={image.capture}>
                                                {image.capture}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted py-3">
                                Chưa có ảnh nào. Nhấn "Thêm" để thêm ảnh.
                            </div>
                        )}
                    </div>
                </div>

                {/* Video Section */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0 font-weight-bold d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faVideo} className="text-danger" />
                            Video
                        </h6>
                        <div className="d-flex gap-2">
                            <KLNButton
                                options={5}
                                icon={faPlus}
                                onClick={handleAddVideo}
                                style={{
                                    fontSize: '12px', 
                                    padding: '6px 12px',
                                    background: 'linear-gradient(135deg, #AD1E32 0%, #D22F27 100%)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 4px rgba(173, 30, 50, 0.2)'
                                }}
                                iconStyle={{marginLeft: '6px', fontSize: '10px'}}
                            >
                                Thêm
                            </KLNButton>
                            <KLNButton
                                options={4}
                                icon={faTrash}
                                onClick={handleDeleteVideos}
                                disabled={selectedVideos.length === 0}
                                style={{
                                    fontSize: '12px', 
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontWeight: '500'
                                }}
                                iconStyle={{marginLeft: '6px', fontSize: '10px'}}
                            >
                                Xóa
                            </KLNButton>
                        </div>
                    </div>
                    
                    <div className="border rounded p-3" style={{minHeight: '100px', maxHeight: '150px', overflowY: 'auto'}}>
                        {tempVideos.length > 0 ? (
                            <div className="row">
                                {tempVideos.map((video) => (
                                    <div key={video.id} className="col-12 mb-2">
                                        <div className="d-flex align-items-center gap-2 p-2 border rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedVideos.includes(video.id)}
                                                onChange={(e) => handleVideoSelection(video.id, e.target.checked)}
                                            />
                                            <div 
                                                style={{width: '40px', height: '40px', backgroundColor: '#f0f0f0'}}
                                                className="rounded d-flex align-items-center justify-content-center"
                                            >
                                                📹
                                            </div>
                                            <span className="text-truncate" title={video.capture}>
                                                {video.capture}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted py-3">
                                Chưa có video nào. Nhấn "Thêm" để thêm video.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TopicModal>
        
        {/* Add modals for images and videos */}
        <AddImageModal topicId={null} />
        <AddVideoModal topicId={null} />
        </>
    );
};

export default CreateTopicModal; 