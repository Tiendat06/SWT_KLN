import React, { useState } from 'react';
import { KLNButton, KLNBreadCrumb, KLNCollapsibleMediaSection } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import { InputText } from 'primereact/inputtext';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '~/context/AppContext';
import { showToast } from '~/utils/Toast';
import { addSlideshowAction } from '~/store/B2B/ManageSlideShow/actions';
import AddImageModal from '../Image/AddImageModal';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import { slideShowService } from '~/services/SlideShowService';
import MediaType from '~/enum/MediaType/MediaType';
import SlideShowType from '~/enum/SlideShowType/SlideShowType';
import { Card } from 'primereact/card';
import clsx from 'clsx';
import styles from '~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss';
import solar_upload_icon_1 from '~/assets/img/icon/solar_upload-linear.png';
import { TEST_USER_ID } from '~/utils/Constansts';

const CreateSlideShowLayout = () => {
    const {
        tempImages, removeTempImages, clearTempMedia,
        setAddImageModalVisible, dispatch
    } = useManageSlideshowContext();
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [posterImage, setPosterImage] = useState(null);
    const [posterPreview, setPosterPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();
    const { toast } = useAppContext();

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Slideshow</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Nhà trưng bày</Link> },
        { template: () => <span>Thêm mới</span> }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePosterUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            
            // Check file type
            const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
            const fileType = file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileType)) {
                showToast({ 
                    toastRef: toast, 
                    severity: 'error', 
                    summary: 'Lỗi', 
                    detail: 'Định dạng file không được hỗ trợ. Vui lòng chọn file ảnh hợp lệ.' 
                });
                return;
            }
            
            setPosterImage(file);
            
            // Tạo preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setPosterPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePosterDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fakeEvent = { target: { files: [file] } };
            handlePosterUpload(fakeEvent);
        }
    };

    const handleAddImage = () => setAddImageModalVisible(true);
    const handleDeleteImages = () => {
        if (selectedImages.length > 0) {
            removeTempImages(selectedImages);
            setSelectedImages([]);
        }
    };
    const handleImageSelection = (imageId, checked) => {
        setSelectedImages(prev => checked ? [...prev, imageId] : prev.filter(id => id !== imageId));
    };
    
    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Vui lòng nhập tên mục trưng bày!' });
            return;
        }
        
        if (!posterImage) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn ảnh bìa!' });
            return;
        }
        
        try {
            setIsSubmitting(true);
            
            const formDataToSend = {
                title: formData.title,
                description: formData.description,
                posterImage: posterImage,
                images: tempImages
            };
            
            const createResult = await slideShowService.createSlideShowWithImages(
                formDataToSend,
                MediaType.TDTMemorial,
                SlideShowType.ExhibitionHouse,
                TEST_USER_ID
            );
            
            if (createResult && createResult.data) {
                // API thành công
                dispatch(addSlideshowAction(createResult.data));
                showToast({ toastRef: toast, severity: 'success', summary: 'Thêm danh mục', detail: 'Thêm danh mục thành công!' });
                clearTempMedia();
                navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition`);
            } else {
                const errorMessage = createResult?.message || 'API response invalid';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error creating slideshow:', error);
            const errorMessage = error?.message || 'Có lỗi xảy ra khi tạo slideshow';
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Lỗi tạo slideshow',
                detail: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const isFormValid = formData.title.trim() !== '' && posterImage !== null && tempImages.length > 0;
    
    return (
        <div className="container py-4">
            <h2 style={{ marginLeft: 15, fontWeight: 'bold', fontSize: '24px' }}>Thêm danh mục trưng bày</h2>
            <KLNBreadCrumb items={items} />
            <div className="p-4">
                {/* Ảnh bìa Section - Di chuyển lên đầu */}
                <div className="mb-4">
                    <div className="d-flex flex-wrap">
                        <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh bìa lên</h6>}>
                                <div
                                    onDrop={handlePosterDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={clsx(styles["create-image__add--image"])}
                                    style={{ height: 350 }}
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
                                            acceptedFileType=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                                            onHandleFileChange={handlePosterUpload}
                                            style={{
                                                cursor: "pointer",
                                                marginTop: 10
                                            }}
                                        >
                                            Tải ảnh bìa lên
                                        </KLNButton>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước ảnh bìa</h6>}>
                                <div style={{ height: 350 }} className={clsx(styles["create-image__preview--image"])}>
                                    {posterPreview ? (
                                        <img 
                                            src={posterPreview} 
                                            alt="Xem trước ảnh bìa" 
                                            style={{width: '100%', height: '100%', objectFit: 'contain'}}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            Chưa có ảnh bìa
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ fontSize: '16px' }}>Tên mục trưng bày *</label>
                    <InputText
                        value={formData.title}
                        onChange={e => handleInputChange('title', e.target.value)}
                        placeholder="Nhập nội dung..."
                        className="w-100"
                        style={{ fontSize: '15px' }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ fontSize: '16px' }}>Mô tả</label>
                    <InputText
                        value={formData.description}
                        onChange={e => handleInputChange('description', e.target.value)}
                        placeholder="Nhập mô tả..."
                        className="w-100"
                        style={{ fontSize: '15px' }}
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
                        onClick={e => {
                            e.preventDefault();
                            clearTempMedia();
                            setFormData({ title: '', description: '' });
                            setPosterImage(null);
                            setPosterPreview('');
                            setSelectedImages([]);
                            navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition`);
                        }}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Hủy</KLNButton>
                </div>
            </div>
            <AddImageModal slideShowId={null} />
        </div>
    );
};

export default CreateSlideShowLayout; 