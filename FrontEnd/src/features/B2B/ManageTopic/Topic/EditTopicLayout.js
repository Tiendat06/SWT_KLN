import React, { useState, useEffect } from "react";
import { KLNTopicForm } from "~/components";
import { useManageTopicContext } from "~/context/B2B/ManageTopic/ManageTopicContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import { topicService } from "~/services/TopicService";
import { updateTopicAction, getTopicImagesAction, getTopicVideosAction } from '~/store/B2B/ManageTopic/actions';
import { AddImageModal, AddVideoModal } from "~/features/B2B/ManageTopic";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const EditTopicLayout = () => {
    const { dispatch, topics, setAddImageModalVisible, setAddVideoModalVisible } = useManageTopicContext();
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

    // Breadcrumb items
    const breadcrumbItems = [
        { template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</a> },
        { template: () => <span>Chỉnh sửa</span> }
    ];

    useEffect(() => {
        let isMounted = true;
        const fetchTopicAndMedia = async () => {
            setLoading(true);
            let topic = topics.find(t => t.topicId === topicId);
            if (!topic) {
                // Fetch topic from backend
                try {
                    const res = await topicService.getTopicByIdService(topicId);
                    topic = res?.data;
                } catch {
                    topic = null;
                }
            }
            if (topic && isMounted) {
                setFormData({ capture: topic.capture });
                // Fetch media
                try {
                    const [imagesResult, videosResult] = await Promise.all([
                        topicService.getTopicImagesService(topicId),
                        topicService.getTopicVideosService(topicId)
                    ]);
                    if (imagesResult?.data?.topicImages) {
                        setTopicImages(imagesResult.data.topicImages);
                        dispatch(getTopicImagesAction(imagesResult.data.topicImages));
                    } else {
                        setTopicImages([]);
                    }
                    if (videosResult?.data?.topicVideos) {
                        setTopicVideos(videosResult.data.topicVideos);
                        dispatch(getTopicVideosAction(videosResult.data.topicVideos));
                    } else {
                        setTopicVideos([]);
                    }
                } catch {
                    setTopicImages([]);
                    setTopicVideos([]);
                }
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

    // Handlers
    const handleFormDataChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddImage = () => setAddImageModalVisible(true);
    const handleAddVideo = () => setAddVideoModalVisible(true);
    
    const handleDeleteImages = async () => {
        if (selectedImages.length === 0) return;
        try {
            await Promise.all(selectedImages.map(imageId => topicService.deleteTopicImageService(topicId, imageId)));
            // Reload media
            const imagesResult = await topicService.getTopicImagesService(topicId);
            setTopicImages(imagesResult?.data?.topicImages || []);
            dispatch(getTopicImagesAction(imagesResult?.data?.topicImages || []));
            setSelectedImages([]);
        } catch {}
    };
    
    const handleDeleteVideos = async () => {
        if (selectedVideos.length === 0) return;
        try {
            await Promise.all(selectedVideos.map(videoId => topicService.deleteTopicVideoService(topicId, videoId)));
            // Reload media
            const videosResult = await topicService.getTopicVideosService(topicId);
            setTopicVideos(videosResult?.data?.topicVideos || []);
            dispatch(getTopicVideosAction(videosResult?.data?.topicVideos || []));
            setSelectedVideos([]);
        } catch {}
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
            }
            showToast({ toastRef: toast, severity: 'error', summary: 'Cập nhật chuyên đề', detail: updateResult?.message || 'Có lỗi xảy ra.' });
        } catch (error) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Cập nhật chuyên đề', detail: 'Có lỗi xảy ra.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleCancel = (e) => { 
        e.preventDefault();
        setFormData({ capture: '' });
        setSelectedImages([]);
        setSelectedVideos([]);
        navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`); 
    };

    const isFormValid = formData.capture.trim() !== '';

    return (
        <>
            <KLNTopicForm
                // Form data props
                formData={formData}
                onFormDataChange={handleFormDataChange}
                isFormValid={isFormValid}
                
                // Page props
                pageTitle="Chỉnh sửa chuyên đề"
                breadcrumbItems={breadcrumbItems}
                
                // Images props
                images={topicImages}
                onAddImage={handleAddImage}
                onDeleteImages={handleDeleteImages}
                selectedImages={selectedImages}
                onImageSelection={handleImageSelection}
                
                // Videos props
                videos={topicVideos}
                onAddVideo={handleAddVideo}
                onDeleteVideos={handleDeleteVideos}
                selectedVideos={selectedVideos}
                onVideoSelection={handleVideoSelection}
                
                // Action props
                submitButtonText="Cập nhật"
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                
                // Loading state
                loading={loading}
            />
            
            <AddImageModal topicId={topicId} />
            <AddVideoModal topicId={topicId} />
        </>
    );
};

export default EditTopicLayout; 