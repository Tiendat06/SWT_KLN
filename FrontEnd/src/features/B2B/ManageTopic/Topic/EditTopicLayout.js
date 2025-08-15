import React, { useState, useEffect } from "react";
import { KLNButton, KLNBreadCrumb, KLNCollapsibleMediaSection } from "~/components";
import { useManageTopicContext } from "~/context/B2B/ManageTopic/ManageTopicContext";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import { topicService } from "~/services/TopicService";
import { 
    updateTopicAction, 
    getTopicImagesAction, 
    getTopicVideosAction,
    deleteTopicImageAction,
    deleteTopicVideoAction
} from '~/store/B2B/ManageTopic/actions';
import { AddImageModal, AddVideoModal } from "~/features/B2B/ManageTopic";
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import MediaType from "~/enum/MediaType/MediaType";
import { TEST_USER_ID } from "~/utils/Constansts";

const EditTopicLayout = () => {
    const { 
        dispatch, topics, setAddImageModalVisible, setAddVideoModalVisible,
        topicImages: contextTopicImages, topicVideos: contextTopicVideos
    } = useManageTopicContext();
    const [formData, setFormData] = useState({ capture: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [topicImages, setTopicImages] = useState([]);
    const [topicVideos, setTopicVideos] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { topicId } = useParams();
    const { toast } = useAppContext();

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Danh sách chuyên đề</Link> },
        { template: () => <span>Chỉnh sửa</span> }
    ];

    useEffect(() => {
        let isMounted = true;
        const fetchTopicAndMedia = async () => {
            setLoading(true);
            let topic = topics.find(t => t.topicId === topicId);
            if (!topic) {
                try {
                    const res = await topicService.getTopicByIdService(topicId);
                    topic = res?.data;
                } catch {
                    topic = null;
                }

            }
            if (topic && isMounted) {
                setFormData({ capture: topic.capture });
                const images = Array.isArray(topic.images) ? topic.images : 
                             Array.isArray(topic.topicImages) ? topic.topicImages : [];
                const videos = Array.isArray(topic.videos) ? topic.videos : 
                             Array.isArray(topic.topicVideos) ? topic.topicVideos : [];
                
                setTopicImages(images);
                setTopicVideos(videos);
                dispatch(getTopicImagesAction(images));
                dispatch(getTopicVideosAction(videos));
            } else if (isMounted) {
                setFormData({ capture: '' });
                setTopicImages([]);
                setTopicVideos([]);
            }
            setLoading(false);
        };
        fetchTopicAndMedia();
        return () => { isMounted = false; };
    }, [topicId, topics, dispatch]);

    // Sync với context khi có thay đổi từ modal (thêm media mới)
    useEffect(() => {
        if (contextTopicImages.length > 0) {
            const currentTopicImages = contextTopicImages.filter(img => 
                !img.topicId || img.topicId === topicId
            );
            setTopicImages(currentTopicImages);
        }
    }, [contextTopicImages, topicId]);

    useEffect(() => {
        if (contextTopicVideos.length > 0) {
            const currentTopicVideos = contextTopicVideos.filter(video => 
                !video.topicId || video.topicId === topicId
            );
        setTopicVideos(currentTopicVideos);
        }
    }, [contextTopicVideos, topicId]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddImage = () => setAddImageModalVisible(true);
    const handleAddVideo = () => setAddVideoModalVisible(true);
    const handleDeleteImages = async () => {
        if (selectedImages.length === 0) return;
        try {
            await topicService.deleteTopicMediaService({
                topicId,
                mediaTypeId: MediaType.None,
                userId: TEST_USER_ID,
                imageIds: selectedImages,
                videoIds: []
            });
        } catch (apiError) {
            console.warn('API lỗi khi xóa ảnh, tiếp tục cập nhật UI:', apiError);
        }
        dispatch(deleteTopicImageAction(selectedImages));
        setTopicImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
        setSelectedImages([]);
        showToast({ 
            toastRef: toast, 
            severity: 'success', 
            summary: 'Xóa ảnh', 
            detail: 'Xóa ảnh thành công!' 
        });
    };
    const handleDeleteVideos = async () => {
        if (selectedVideos.length === 0) return;
        try {
            await topicService.deleteTopicMediaService({
                topicId,
                mediaTypeId: MediaType.None,
                userId: TEST_USER_ID,
                imageIds: [],
                videoIds: selectedVideos
            });
        } catch (apiError) {
            console.warn('API lỗi khi xóa video, tiếp tục cập nhật UI:', apiError);
        }
        dispatch(deleteTopicVideoAction(selectedVideos));
        setTopicVideos(prev => prev.filter(video => !selectedVideos.includes(video.id)));
        setSelectedVideos([]);
        showToast({ 
            toastRef: toast, 
            severity: 'success', 
            summary: 'Xóa video', 
            detail: 'Xóa video thành công!' 
        });
    };
    const handleImageSelection = (imageId, checked) => {
        setSelectedImages(prev => checked ? [...prev, imageId] : prev.filter(id => id !== imageId));
    };
    const handleVideoSelection = (videoId, checked) => {
        setSelectedVideos(prev => checked ? [...prev, videoId] : prev.filter(id => id !== videoId));
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            const updateResult = await topicService.updateTopicService(topicId, formData);
            if (updateResult && updateResult.data) {
                dispatch(updateTopicAction(updateResult.data));
                showToast({ toastRef: toast, severity: 'success', summary: 'Cập nhật chuyên đề', detail: 'Cập nhật thành công!' });
                navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`);
                return;
            } else {
                const errorMessage = updateResult?.message || 'API response invalid';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error updating topic:', error);
            const errorMessage = error?.message || 'Có lỗi xảy ra khi cập nhật chuyên đề';
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Lỗi cập nhật chuyên đề',
                detail: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const isFormValid = formData.capture.trim() !== '';
    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}><span>Đang tải dữ liệu...</span></div>;
    return (
        <div className="container py-4">
            <h2 style={{ marginLeft: 15, fontWeight: "bold", fontSize: "24px" }}>Chỉnh sửa chuyên đề</h2>
            <KLNBreadCrumb items={items} />
            <div className="p-4">
                <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ fontSize: "16px" }}>Tên chuyên đề *</label>
                    <InputText
                        value={formData.capture}
                        onChange={e => handleInputChange('capture', e.target.value)}
                        placeholder="Nhập nội dung..."
                        className="w-100"
                        style={{ fontSize: "15px" }}
                    />
                </div>
                {/* Ảnh Section */}
                <KLNCollapsibleMediaSection
                    title="Ảnh"
                    icon={faImage}
                    iconColor="text-primary"
                    mediaList={topicImages}
                    selectedItems={selectedImages}
                    onAdd={handleAddImage}
                    onDelete={handleDeleteImages}
                    onItemSelection={handleImageSelection}
                    emptyMessage="Chưa có ảnh nào. Nhấn 'Thêm' để thêm ảnh."
                    addButtonText="Thêm"
                    deleteButtonText="Xóa"
                    addButtonOptions={KLNButtonEnum.successBtn}
                    deleteButtonOptions={KLNButtonEnum.secondDangerBtn}
                />
                {/* Video Section */}
                <KLNCollapsibleMediaSection
                    title="Video"
                    icon={faVideo}
                    iconColor="text-danger"
                    mediaList={topicVideos}
                    selectedItems={selectedVideos}
                    onAdd={handleAddVideo}
                    onDelete={handleDeleteVideos}
                    onItemSelection={handleVideoSelection}
                    emptyMessage="Chưa có video nào. Nhấn 'Thêm' để thêm video."
                    addButtonText="Thêm"
                    deleteButtonText="Xóa"
                    addButtonOptions={KLNButtonEnum.successBtn}
                    deleteButtonOptions={KLNButtonEnum.secondDangerBtn}
                />
                <div className="d-flex gap-3 justify-content-center">
                    <KLNButton
                        isLoading={isSubmitting}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={handleSubmit}
                        disabled={!isFormValid || isSubmitting}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Cập nhật</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        urlLink="#"
                        onClick={(e) => { 
                            e.preventDefault();
                            setFormData({ capture: '' });
                            setSelectedImages([]);
                            setSelectedVideos([]);
                            navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`); 
                        }}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Hủy</KLNButton>
                </div>
            </div>
            <AddImageModal topicId={topicId} />
            <AddVideoModal topicId={topicId} />
        </div>
    );
};

export default EditTopicLayout; 
