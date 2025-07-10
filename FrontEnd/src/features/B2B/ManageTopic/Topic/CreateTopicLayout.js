import React, { useState } from "react";
import { KLNTopicForm } from "~/components";
import { useManageTopicContext } from "~/context/B2B/ManageTopic/ManageTopicContext";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import { topicService } from "~/services/TopicService";
import { addTopicAction } from '~/store/B2B/ManageTopic/actions';
import { AddImageModal, AddVideoModal } from "~/features/B2B/ManageTopic";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const CreateTopicLayout = () => {
    const {
        tempImages, tempVideos, removeTempImages, removeTempVideos, clearTempMedia,
        setAddImageModalVisible, setAddVideoModalVisible, dispatch
    } = useManageTopicContext();
    const [formData, setFormData] = useState({ capture: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const navigate = useNavigate();
    const { toast } = useAppContext();

    // Breadcrumb items
    const breadcrumbItems = [
        { template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</a> },
        { template: () => <span>Thêm mới</span> }
    ];

    // Handlers
    const handleFormDataChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddImage = () => setAddImageModalVisible(true);
    const handleAddVideo = () => setAddVideoModalVisible(true);
    
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
        setSelectedImages(prev => checked ? [...prev, imageId] : prev.filter(id => id !== imageId));
    };
    
    const handleVideoSelection = (videoId, checked) => {
        setSelectedVideos(prev => checked ? [...prev, videoId] : prev.filter(id => id !== videoId));
    };
    
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const topicData = { ...formData, images: tempImages, videos: tempVideos };
            const createResult = await topicService.createTopicWithMediaService(topicData);
            if (createResult && createResult.data) {
                dispatch(addTopicAction(createResult.data));
                showToast({ toastRef: toast, severity: 'success', summary: 'Thêm chuyên đề', detail: 'Thêm chuyên đề thành công!' });
                clearTempMedia();
                navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`);
                return;
            }
            showToast({ toastRef: toast, severity: 'error', summary: 'Thêm chuyên đề', detail: createResult?.message || 'Có lỗi xảy ra.' });
        } catch (error) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Thêm chuyên đề', detail: 'Có lỗi xảy ra.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleCancel = (e) => { 
        e.preventDefault();
        clearTempMedia(); 
        setFormData({ capture: '', description: '' });
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
                pageTitle="Thêm chuyên đề mới"
                breadcrumbItems={breadcrumbItems}
                
                // Images props
                images={tempImages}
                onAddImage={handleAddImage}
                onDeleteImages={handleDeleteImages}
                selectedImages={selectedImages}
                onImageSelection={handleImageSelection}
                
                // Videos props
                videos={tempVideos}
                onAddVideo={handleAddVideo}
                onDeleteVideos={handleDeleteVideos}
                selectedVideos={selectedVideos}
                onVideoSelection={handleVideoSelection}
                
                // Action props
                submitButtonText="Lưu"
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            
            <AddImageModal topicId={null} />
            <AddVideoModal topicId={null} />
        </>
    );
};

export default CreateTopicLayout; 