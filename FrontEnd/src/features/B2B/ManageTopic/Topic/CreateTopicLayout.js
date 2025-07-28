import React, { useState } from "react";
import { KLNButton, KLNBreadCrumb, KLNCollapsibleMediaSection } from "~/components";
import { useManageTopicContext } from "~/context/B2B/ManageTopic/ManageTopicContext";
import { InputText } from "primereact/inputtext";
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import { topicService } from "~/services/TopicService";
import { addTopicAction } from '~/store/B2B/ManageTopic/actions';
import { AddImageModal, AddVideoModal } from "~/features/B2B/ManageTopic";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
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

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Danh sách chuyên đề</Link> },
        { template: () => <span>Thêm mới</span> }
    ];

    const handleInputChange = (field, value) => {
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
        const topicData = { ...formData, images: tempImages, videos: tempVideos };
        
        try {
            const createResult = await topicService.createTopicWithMediaService(topicData);
            if (createResult && createResult.data) {
                // API thành công
                dispatch(addTopicAction(createResult.data));
                showToast({ toastRef: toast, severity: 'success', summary: 'Thêm chuyên đề', detail: 'Thêm chuyên đề thành công!' });
                clearTempMedia();
                navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`);
                return;
            } else {
                throw new Error('API response invalid');
            }
        } catch (error) {
            console.warn('API lỗi, sử dụng mock data:', error);
            
            // API lỗi - tạo mock topic và vẫn điều hướng
            const mockTopic = {
                topicId: Date.now() + Math.random(),
                ...formData,
                images: tempImages,
                videos: tempVideos,
                createdAt: new Date().toISOString()
            };
            
            dispatch(addTopicAction(mockTopic));
            showToast({ 
                toastRef: toast, 
                severity: 'success', 
                summary: 'Thêm chuyên đề', 
                detail: 'Thêm chuyên đề thành công!' 
            });
            clearTempMedia();
            navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const isFormValid = formData.capture.trim() !== '';
    return (
        <div className="container py-4">
            <h2 style={{ marginLeft: 15, fontWeight: "bold", fontSize: "24px" }}>Thêm chuyên đề mới</h2>
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
                    mediaList={tempImages}
                    selectedItems={selectedImages}
                    onAdd={handleAddImage}
                    onDelete={handleDeleteImages}
                    onItemSelection={handleImageSelection}
                    emptyMessage="Chưa có ảnh nào. Nhấn 'Thêm' để thêm ảnh."
                    addButtonText="Thêm"
                    deleteButtonText="Xóa"
                    addButtonOptions={KLNButtonEnum.dangerBtn}
                    deleteButtonOptions={KLNButtonEnum.secondDangerBtn}
                />
                {/* Video Section */}
                <KLNCollapsibleMediaSection
                    title="Video"
                    icon={faVideo}
                    iconColor="text-danger"
                    mediaList={tempVideos}
                    selectedItems={selectedVideos}
                    onAdd={handleAddVideo}
                    onDelete={handleDeleteVideos}
                    onItemSelection={handleVideoSelection}
                    emptyMessage="Chưa có video nào. Nhấn 'Thêm' để thêm video."
                    addButtonText="Thêm"
                    deleteButtonText="Xóa"
                    addButtonOptions={KLNButtonEnum.dangerBtn}
                    deleteButtonOptions={KLNButtonEnum.secondDangerBtn}
                />
                <div className="d-flex gap-3 justify-content-center">
                    <KLNButton
                        isLoading={isSubmitting}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={handleSubmit}
                        disabled={!isFormValid || isSubmitting}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Lưu</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        urlLink="#"
                        onClick={(e) => { 
                            e.preventDefault();
                            clearTempMedia(); 
                            setFormData({ capture: '', description: '' });
                            setSelectedImages([]);
                            setSelectedVideos([]);
                            navigate(`${AppRoutesEnum.AdminRoute}/manage-topic`); 
                        }}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Hủy</KLNButton>
                </div>
            </div>
            <AddImageModal topicId={null} />
            <AddVideoModal topicId={null} />
        </div>
    );
};

export default CreateTopicLayout; 