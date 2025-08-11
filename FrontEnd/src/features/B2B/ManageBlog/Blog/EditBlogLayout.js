import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import clsx from 'clsx';
import KLNButton from '~/components/KLNButton/KLNButton';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import { useManageBlogContext } from '~/context/B2B/ManageBlog/ManageBlogContext';
import { blogService } from '~/services/BlogService';
import { updateBlogAction } from '~/store/B2B/ManageBlog/actions';
import { showToast } from '~/utils/Toast';
import MediaType from '~/enum/MediaType/MediaType';
import { KLNEditor, KLNBreadCrumb } from '~/components';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import styles from '~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '~/context/AppContext';
import { EDIT_BLOG_TITLE} from '~/utils/Constansts';

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const EditBlogLayout = () => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        mediaTypeId: '',
        content: '',
        imageFile: null,
    });
    const [posterPreview, setPosterPreview] = useState('');
    const { dispatch } = useManageBlogContext();
    const { toast } = useAppContext();
    const [posterImage, setPosterImage] = useState(null);

    // Breadcrumb items
    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-blog`}>Blog</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-blog`}>Danh sách blog</Link> },
        { template: () => <span>Chỉnh sửa</span> }
    ];

    // Hàm map mediaTypeId sang tên module
    const getModuleNameByMediaTypeId = (mediaTypeId) => {
        switch (mediaTypeId) {
            case MediaType.TDTMemorial: return 'Khu lưu niệm bác Tôn';
            case MediaType.PresidentTDT: return 'Chủ Tịch Tôn Đức Thắng';
            case MediaType.TDTHandiwork: return 'Công trình mang tên Bác Tôn';
            default: return '';
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await blogService.getBlogByIdService(blogId);
                if (res && res.data) {
                    setFormData({
                        title: res.data.blogTitle || '',
                        mediaTypeId: res.data.mediaTypeId || '',
                        content: res.data.blogContent || '',
                        imageFile: null,
                    });
                    setPosterPreview(res.data.blogImage || '');
                }
            } catch (err) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Không thể tải blog!' });
            }
        };
        fetchBlog();
    }, [blogId]);

    const handlePosterUpload = (input) => {
        let file;
        if (input instanceof File) {
            file = input;
        } else if (input && input.target && input.target.files && input.target.files.length > 0) {
            file = input.target.files[0];
        }
        if (file) {
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handlePosterUpload(e.dataTransfer.files[0]);
        }
    };

    // Handle form change
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await blogService.updateBlogService(blogId, {
                title: formData.title,
                content: formData.content,
                imageFile: formData.imageFile,
                description: '',
                mediaTypeId: formData.mediaTypeId,
            }, formData.mediaTypeId);
            if (res && res.data) {
                dispatch(updateBlogAction(res.data));
                showToast({ toastRef: toast, severity: 'success', summary: 'Thành công', detail: 'Cập nhật blog thành công!' });
                navigate(`${AppRoutesEnum.AdminRoute}/manage-blog`);
            } else {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhật blog!' });
            }
        } catch (err) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Có lỗi xảy ra khi cập nhật blog!' });
        }
    };

    // Handle cancel
    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({ title: '', mediaTypeId: '', content: '', imageFile: null });
        setPosterPreview('');
        navigate(`${AppRoutesEnum.AdminRoute}/manage-blog`);
    };

    return (
        <div className="container py-4">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>{EDIT_BLOG_TITLE}</h2>
            <KLNBreadCrumb items={items} />
            <div className="mb-4">
                <div className="d-flex flex-wrap">
                    {/* Left: Upload poster */}
                    <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                        <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh bìa lên</h6>}>
                            <div
                                onDrop={handlePosterDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className={clsx(styles["create-image__add--image"])}
                                style={{ height: 350 }}
                            >
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" color="#aaa" />
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
                    {/* Right: Preview poster */}
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
            <form onSubmit={handleSubmit} className="row">
                <div className="col-12 d-flex align-items-center mb-3">
                    <div className="me-3 flex-grow-1">
                        <label className="form-label" style={{ fontSize: '16px' }}>Thông tin chung:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tiêu đề"
                            value={formData.title}
                            onChange={e => handleChange('title', e.target.value)}
                            required
                            style={{ fontSize: '15px' }}
                        />
                    </div>
                    <div style={{ minWidth: 220 }}>
                        <label className="form-label" style={{ fontSize: '16px' }}>Module:</label>
                        <select
                            className="form-control"
                            value={formData.mediaTypeId}
                            onChange={e => handleChange('mediaTypeId', Number(e.target.value))}
                            required
                            style={{ fontSize: '15px' }}
                        >
                            <option value="">Chọn module</option>
                            <option value={MediaType.PresidentTDT}>Chủ Tịch Tôn Đức Thắng</option>
                            <option value={MediaType.TDTMemorial}>Khu lưu niệm bác Tôn</option>
                            <option value={MediaType.TDTHandiwork}>Công trình mang tên Bác Tôn</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label" style={{ fontSize: '16px' }}>Nội dung</label>
                    <KLNEditor
                        value={formData.content}
                        onChange={content => handleChange('content', content)}
                        apiKey={TINYMCE_API_KEY}
                    />
                </div>
                <div className="col-12 d-flex justify-content-center gap-3 mt-4">
                    <KLNButton options={KLNButtonEnum.primaryBtn} type="submit" style={{ minWidth: 120, fontSize: '16px', padding: '8px 20px' }}>Lưu</KLNButton>
                    <KLNButton options={KLNButtonEnum.whiteBtn} urlLink={`${AppRoutesEnum.AdminRoute}/manage-blog`} onClick={handleCancel} style={{ minWidth: 120, fontSize: '16px', padding: '8px 20px' }}>Hủy</KLNButton>
                </div>
            </form>
        </div>
    );
};

export default EditBlogLayout; 