import React, { useState, useEffect } from 'react';
import { KLNButton, KLNBreadCrumb, KLNCollapsibleMediaSection } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import { InputText } from 'primereact/inputtext';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '~/context/AppContext';
import { showToast } from '~/utils/Toast';
import { updateSlideshowAction } from '~/store/B2B/ManageSlideShow/actions';
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

const EditSlideShowLayout = ({ slideShowId }) => {
    const {
        slideshows, setAddImageModalVisible, tempImages: contextTempImages, dispatch
    } = useManageSlideshowContext();
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [posterImage, setPosterImage] = useState(null);
    const [posterPreview, setPosterPreview] = useState('');
    const [currentPosterUrl, setCurrentPosterUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slideImages, setSlideImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useAppContext();

    const items = [
        { template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Slideshow</a> },
        { template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Nhà trưng bày</a> },
        { template: () => <span>Chỉnh sửa</span> }
    ];

    useEffect(() => {
        let isMounted = true;
        const fetchSlideshow = async () => {
            setLoading(true);
            let slideshow = slideshows.find(s => s.slideShowId === slideShowId);
            if (!slideshow) {
                try {
                    const result = await slideShowService.getSlideShowByIdService(slideShowId);
                    if (result && result.data) {
                        slideshow = result.data;
                    }
                } catch (error) {
                    console.warn('API lỗi, không tìm thấy slideshow:', error);
                    slideshow = null;
                }
            }
            if (slideshow && isMounted) {
                setFormData({ title: slideshow.title, description: slideshow.description });
                setSlideImages(slideshow.slideImage || []);
                // Set current poster image if exists - check multiple field names
                const posterImageUrl = slideshow.imageLink || slideshow.image || slideshow.posterImage || slideshow.thumbnailUrl;
                if (posterImageUrl) {
                    setCurrentPosterUrl(posterImageUrl);
                    setPosterPreview(posterImageUrl);
                }
            } else if (isMounted) {
                setFormData({ title: '', description: '' });
                setSlideImages([]);
                setCurrentPosterUrl('');
                setPosterPreview('');
            }
            setLoading(false);
        };
        fetchSlideshow();
        return () => { isMounted = false; };
    }, [slideShowId, slideshows]);

    // Sync với context khi có thay đổi từ modal (thêm ảnh mới)
    useEffect(() => {
        if (contextTempImages.length > 0) {
            setSlideImages(contextTempImages.filter(img => !img.slideShowId || img.slideShowId === slideShowId));
        }
    }, [contextTempImages, slideShowId]);

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
            setSlideImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
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
        
        setIsSubmitting(true);
        try {
            try {
                const updateResult = await slideShowService.updateSlideShowService(
                    slideShowId, 
                    {
                        title: formData.title,
                        description: formData.description,
                        posterImage: posterImage, // Include poster image if changed
                        images: [] // Không cập nhật images trong edit slideshow, chỉ cập nhật thông tin cơ bản
                    },
                    MediaType.TDTMemorial,
                    SlideShowType.ExhibitionHouse,
                    TEST_USER_ID
                );
                
                if (updateResult && updateResult.data) {
                    dispatch(updateSlideshowAction(updateResult.data));
                    showToast({ toastRef: toast, severity: 'success', summary: 'Cập nhật danh mục', detail: 'Cập nhật thành công!' });
                    navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition`);
                    return;
                } else if (updateResult && updateResult.status && updateResult.message && !updateResult.data) {
                    console.error('API Error Details:', updateResult);
                    showToast({ 
                        toastRef: toast, 
                        severity: 'error', 
                        summary: 'Lỗi API', 
                        detail: `${updateResult.status}: ${updateResult.message || 'Unknown error'}` 
                    });
                    throw new Error(`API Error ${updateResult.status}: ${updateResult.message || 'Unknown error'}`);
                } else {
                    throw new Error('API response invalid');
                }
            } catch (apiError) {
                console.warn('API lỗi, sử dụng mock data:', apiError);
                
                // Fallback to mock
                const mockUpdatedSlideshow = {
                    slideShowId,
                    ...formData,
                    slideImage: slideImages,
                    updateDate: new Date().toISOString()
                };
                dispatch(updateSlideshowAction(mockUpdatedSlideshow));
                showToast({ toastRef: toast, severity: 'success', summary: 'Cập nhật danh mục', detail: 'Cập nhật thành công! (Mock data)' });
                navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const isFormValid = formData.title.trim() !== '';
    
    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}><span>Đang tải dữ liệu...</span></div>;
    
    return (
        <div className="container py-4">
            <h2 style={{ marginLeft: 15, fontWeight: 'bold', fontSize: '24px' }}>Chỉnh sửa danh mục trưng bày</h2>
            <KLNBreadCrumb items={items} />
            <div className="p-4">
                {/* Poster Image Section - Moved to top */}
                <div className="mb-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Cập nhật ảnh bìa</h6>}>
                                <div
                                    onDrop={handlePosterDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={clsx(styles["create-image__add--image"])}
                                    style={{ height: 300 }}
                                >
                                    <div className="text-center">
                                        <img src={solar_upload_icon_1} alt="Icon upload"/>
                                        <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kéo thả tệp tại đây để thay đổi</p>
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
                                            Chọn ảnh bìa mới
                                        </KLNButton>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước ảnh bìa</h6>}>
                                <div style={{ height: 300 }} className={clsx(styles["create-image__preview--image"])}>
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
                    mediaList={slideImages}
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
                        onClick={e => {
                            e.preventDefault();
                            setFormData({ title: '', description: '' });
                            setPosterImage(null);
                            setPosterPreview(currentPosterUrl);
                            setSelectedImages([]);
                            navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition`);
                        }}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >Hủy</KLNButton>
                </div>
            </div>
            <AddImageModal slideShowId={slideShowId} />
        </div>
    );
};

export default EditSlideShowLayout; 