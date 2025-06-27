import {TopicModal, KLNButton} from "~/components";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {useState, useEffect, useCallback} from "react";
import {InputText} from "primereact/inputtext";

import {topicService} from "~/services/TopicService";
import {
    updateTopicAction,
    getTopicImagesAction,
    getTopicVideosAction
} from '~/store/B2B/ManageTopic/actions';

const EditTopicModal = () => {
    const {
        editTopicModalVisible, setEditTopicModalVisible, editingTopic, setEditingTopic, setIsUpdated,
        setAddImageModalVisible, setAddVideoModalVisible, dispatch
    } = useManageTopicContext();

    const [formData, setFormData] = useState({
        capture: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [topicImages, setTopicImages] = useState([]);
    const [topicVideos, setTopicVideos] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const loadTopicMedia = useCallback(async (topicId) => {
        try {
            const [imagesResult, videosResult] = await Promise.all([
                topicService.getTopicImagesService(topicId),
                topicService.getTopicVideosService(topicId)
            ]);
            
            if (imagesResult?.data?.topicImages) {
                const images = imagesResult.data.topicImages;
                setTopicImages(images);
                // Update store
                dispatch(getTopicImagesAction(images));
            }
            if (videosResult?.data?.topicVideos) {
                const videos = videosResult.data.topicVideos;
                setTopicVideos(videos);
                // Update store
                dispatch(getTopicVideosAction(videos));
            }
        } catch (error) {
            console.error('Error loading topic media:', error);
            // Use mock data if API fails
            const mockImages = [
                {id: 1, capture: 'Ảnh mẫu 1', imageLink: '/placeholder-image-1.jpg'},
                {id: 2, capture: 'Ảnh mẫu 2', imageLink: '/placeholder-image-2.jpg'}
            ];
            const mockVideos = [
                {id: 1, capture: 'Video mẫu 1', videoLink: '/placeholder-video-1.mp4'},
                {id: 2, capture: 'Video mẫu 2', videoLink: '/placeholder-video-2.mp4'}
            ];
            setTopicImages(mockImages);
            setTopicVideos(mockVideos);
            // Update store with mock data
            dispatch(getTopicImagesAction(mockImages));
            dispatch(getTopicVideosAction(mockVideos));
        }
    }, [dispatch]);

    useEffect(() => {
        if (editingTopic && editTopicModalVisible) {
            setFormData({
                capture: editingTopic.capture || ''
            });
            loadTopicMedia(editingTopic.topicId);
        } else {
            setFormData({
                capture: ''
            });
            setTopicImages([]);
            setTopicVideos([]);
        }
        setSelectedImages([]);
        setSelectedVideos([]);
    }, [editingTopic, editTopicModalVisible, loadTopicMedia]);

    const handleClose = () => {
        setEditTopicModalVisible(false);
        setEditingTopic(null);
        setFormData({
            capture: ''
        });
        setTopicImages([]);
        setTopicVideos([]);
        setSelectedImages([]);
        setSelectedVideos([]);
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

    const handleDeleteImages = async () => {
        if (selectedImages.length === 0) {
            alert('Vui lòng chọn ít nhất một ảnh để xóa');
            return;
        }
        
        try {
            const promises = selectedImages.map(imageId => 
                topicService.deleteTopicImageService(editingTopic.topicId, imageId)
            );
            
            await Promise.all(promises);
            
            // Refresh media list
            loadTopicMedia(editingTopic.topicId);
            setSelectedImages([]);
            
            console.log(`${selectedImages.length} image(s) deleted successfully`);
        } catch (error) {
            console.error('Error deleting images:', error);
        }
    };

    const handleDeleteVideos = async () => {
        if (selectedVideos.length === 0) {
            alert('Vui lòng chọn ít nhất một video để xóa');
            return;
        }
        
        try {
            const promises = selectedVideos.map(videoId => 
                topicService.deleteTopicVideoService(editingTopic.topicId, videoId)
            );
            
            await Promise.all(promises);
            
            // Refresh media list
            loadTopicMedia(editingTopic.topicId);
            setSelectedVideos([]);
            
            console.log(`${selectedVideos.length} video(s) deleted successfully`);
        } catch (error) {
            console.error('Error deleting videos:', error);
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
            
            const updateResult = await topicService.updateTopicService(editingTopic.topicId, formData);
            if (updateResult && updateResult.data) {
                // Update store with updated topic
                dispatch(updateTopicAction(updateResult.data));
                console.log('Topic updated successfully');
            }
            
            setIsUpdated(prev => !prev);
            handleClose();
            
        } catch (error) {
            console.error('Error updating topic:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.capture.trim() !== '';

    return (
        <TopicModal
            visible={editTopicModalVisible}
            onHide={handleClose}
            header="Sửa chuyên đề"
            style={{width: '800px'}}
            labelSave={isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
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
                        <h6 className="mb-0 font-weight-bold">Ảnh</h6>
                        <div className="d-flex gap-2">
                            <KLNButton
                                options={5}
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
                            >
                                Thêm
                            </KLNButton>
                            <KLNButton
                                options={4}
                                onClick={handleDeleteImages}
                                disabled={selectedImages.length === 0}
                                style={{fontSize: '12px', padding: '6px 12px'}}
                            >
                                Xóa
                            </KLNButton>
                        </div>
                    </div>
                    
                    <div className="border rounded p-3" style={{minHeight: '100px', maxHeight: '150px', overflowY: 'auto'}}>
                        {topicImages.length > 0 ? (
                            <div className="row">
                                {topicImages.map((image) => (
                                    <div key={image.id} className="col-md-6 mb-2">
                                        <div className="d-flex align-items-center gap-2 p-2 border rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedImages.includes(image.id)}
                                                onChange={(e) => handleImageSelection(image.id, e.target.checked)}
                                            />
                                            <img 
                                                src={image.imageLink || '/placeholder-image.jpg'} 
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
                        <h6 className="mb-0 font-weight-bold">Video</h6>
                        <div className="d-flex gap-2">
                            <KLNButton
                                options={5}
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
                            >
                                Thêm
                            </KLNButton>
                            <KLNButton
                                options={4}
                                onClick={handleDeleteVideos}
                                disabled={selectedVideos.length === 0}
                                style={{fontSize: '12px', padding: '6px 12px'}}
                            >
                                Xóa
                            </KLNButton>
                        </div>
                    </div>
                    
                    <div className="border rounded p-3" style={{minHeight: '100px', maxHeight: '150px', overflowY: 'auto'}}>
                        {topicVideos.length > 0 ? (
                            <div className="row">
                                {topicVideos.map((video) => (
                                    <div key={video.id} className="col-md-6 mb-2">
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
    );
};

export default EditTopicModal; 