import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import clsx from 'clsx';
import KLNButton from '~/components/KLNButton/KLNButton';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import { KLNBreadCrumb } from '~/components';
import { useAppContext } from '~/context/AppContext';
import { solemnVisitService } from '~/services/SolemnVisitService';
import { showToast } from '~/utils/Toast';
import { EDIT_SOLEMN_VISIT_TITLE, TEST_USER_ID, MAX_FILE_SIZE } from '~/utils/Constansts';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import styles from '~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const EditSolemnVisitLayout = () => {
    const navigate = useNavigate();
    const { solemnVisitId } = useParams();
    const { toast } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        portraitImageFile: null,
        letterImageFile: null
    });
    const [portraitPreview, setPortraitPreview] = useState('');
    const [letterPreview, setLetterPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const breadcrumbItems = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`}>Lãnh đạo viếng thăm</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`}>Danh sách lãnh đạo viếng thăm</Link> },
        { template: () => <span>Chỉnh sửa</span> }
    ];

    useEffect(() => {
        const fetchSolemnVisit = async () => {
            try {
                setIsFetching(true);
                console.log('[EditSolemnVisit] Fetching id:', solemnVisitId);
                const result = await solemnVisitService.getSolemnVisitByIdService(solemnVisitId);
                console.log('[EditSolemnVisit] Fetch response:', result);
                if (result && result.data) {
                    const solemnVisit = result.data;
                    setFormData({
                        name: solemnVisit.solemnVisitName || '',
                        portraitImageFile: null,
                        letterImageFile: null
                    });
                    setPortraitPreview(solemnVisit.portraitImage);
                    setLetterPreview(solemnVisit.letterImage);
                } else if (result && result.status && result.message) {
                    showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi tải dữ liệu', detail: result.message });
                    navigate(`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`);
                } else {
                    throw new Error('API response invalid');
                }
            } catch (error) {
                console.error('[EditSolemnVisit] Fetch error:', error);
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi tải dữ liệu', detail: error.message || 'Có lỗi xảy ra khi tải thông tin lãnh đạo viếng thăm' });
                navigate(`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`);
            } finally {
                setIsFetching(false);
            }
        };
        if (solemnVisitId) fetchSolemnVisit();
    }, [solemnVisitId, navigate, toast]);

    // Xử lý upload ảnh lãnh đạo
    const handlePortraitUpload = (e) => {
        const file = e.target.files[0];
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

            if (file.size > MAX_FILE_SIZE) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Kích thước file không được vượt quá 4GB' });
                return;
            }
            setFormData(prev => ({ ...prev, portraitImageFile: file }));
            const reader = new FileReader();
            reader.onload = (e) => setPortraitPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePortraitDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
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

            if (file.size > MAX_FILE_SIZE) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Kích thước file không được vượt quá 4GB' });
                return;
            }
            setFormData(prev => ({ ...prev, portraitImageFile: file }));
            const reader = new FileReader();
            reader.onload = (e) => setPortraitPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Xử lý upload ảnh thư viếng thăm
    const handleLetterUpload = (e) => {
        const file = e.target.files[0];
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

            if (file.size > MAX_FILE_SIZE) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Kích thước file không được vượt quá 4GB' });
                return;
            }
            setFormData(prev => ({ ...prev, letterImageFile: file }));
            const reader = new FileReader();
            reader.onload = (e) => setLetterPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleLetterDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
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

            if (file.size > MAX_FILE_SIZE) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Kích thước file không được vượt quá 4GB' });
                return;
            }
            setFormData(prev => ({ ...prev, letterImageFile: file }));
            const reader = new FileReader();
            reader.onload = (e) => setLetterPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi', detail: 'Vui lòng nhập tên lãnh đạo' });
            return;
        }
        try {
            setIsLoading(true);
            const payloadLog = {
                name: formData.name,
                portraitImageFile: formData.portraitImageFile ? {
                    name: formData.portraitImageFile.name,
                    size: formData.portraitImageFile.size,
                    type: formData.portraitImageFile.type
                } : null,
                letterImageFile: formData.letterImageFile ? {
                    name: formData.letterImageFile.name,
                    size: formData.letterImageFile.size,
                    type: formData.letterImageFile.type
                } : null,
                userId: TEST_USER_ID
            };
            console.log('[EditSolemnVisit] Submitting payload:', payloadLog);

            const result = await solemnVisitService.updateSolemnVisitService(
                solemnVisitId,
                {
                    name: formData.name,
                    portraitImageFile: formData.portraitImageFile,
                    letterImageFile: formData.letterImageFile
                },
                TEST_USER_ID
            );
            console.log('[EditSolemnVisit] API response:', result);

            if (result && result.data) {
                showToast({ toastRef: toast, severity: 'success', summary: 'Thành công', detail: 'Cập nhật lãnh đạo viếng thăm thành công' });
                navigate(`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`);
            } else if (result && result.status && result.message) {
                showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi cập nhật', detail: result.message });
            } else {
                throw new Error('API response invalid');
            }
        } catch (error) {
            console.error('[EditSolemnVisit] Update error:', error);
            showToast({ toastRef: toast, severity: 'error', summary: 'Lỗi cập nhật', detail: error.message || 'Có lỗi xảy ra khi cập nhật lãnh đạo viếng thăm' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault && e.preventDefault();
        setFormData({ name: '', portraitImageFile: null, letterImageFile: null });
        setPortraitPreview('');
        setLetterPreview('');
        navigate(`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`);
    };

    if (isFetching) {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>{EDIT_SOLEMN_VISIT_TITLE}</h2>
            <KLNBreadCrumb items={breadcrumbItems} />
            <div className="p-4">
                {/* Trường nhập tên lãnh đạo */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ fontSize: '16px' }}>Tên lãnh đạo *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên lãnh đạo"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        required
                        style={{ fontSize: '15px' }}
                    />
                </div>

                {/* Ảnh lãnh đạo Section */}
                <div className="mb-4">
                    <div className="d-flex flex-wrap">
                        <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh lãnh đạo lên</h6>}>
                                <div
                                    onDrop={handlePortraitDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={clsx(styles["create-image__add--image"])}
                                    style={{ height: 350 }}
                                >
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" color="#aaa" />
                                        <p className="mb-0">Kéo thả tệp tại đây</p>
                                        <p className="mb-0">Kích thước tối đa 4GB với định dạng jpg, png, ...</p>
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                                            onChange={handlePortraitUpload}
                                            style={{ display: 'none' }}
                                            id="portrait-upload"
                                        />
                                        <label
                                            htmlFor="portrait-upload"
                                            className="btn btn-dark"
                                            style={{ cursor: "pointer", marginTop: 10 }}
                                        >
                                            Tải ảnh lãnh đạo lên
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước ảnh lãnh đạo</h6>}>
                                <div style={{ height: 350 }} className={clsx(styles["create-image__preview--image"])}>
                                    {portraitPreview ? (
                                        <img 
                                            src={portraitPreview} 
                                            alt="Xem trước ảnh lãnh đạo" 
                                            style={{width: '100%', height: '100%', objectFit: 'contain'}}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            Chưa có ảnh lãnh đạo
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Ảnh thư viếng thăm Section */}
                <div className="mb-4">
                    <div className="d-flex flex-wrap">
                        <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh thư viếng thăm lên</h6>}>
                                <div
                                    onDrop={handleLetterDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={clsx(styles["create-image__add--image"])}
                                    style={{ height: 350 }}
                                >
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" color="#aaa" />
                                        <p className="mb-0">Kéo thả tệp tại đây</p>
                                        <p className="mb-0">Kích thước tối đa 4GB với định dạng jpg, png, ...</p>
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                                            onChange={handleLetterUpload}
                                            style={{ display: 'none' }}
                                            id="letter-upload"
                                        />
                                        <label
                                            htmlFor="letter-upload"
                                            className="btn btn-dark"
                                            style={{ cursor: "pointer", marginTop: 10 }}
                                        >
                                            Tải ảnh thư viếng thăm lên
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                            <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước ảnh thư viếng thăm</h6>}>
                                <div style={{ height: 350 }} className={clsx(styles["create-image__preview--image"])}>
                                    {letterPreview ? (
                                        <img 
                                            src={letterPreview} 
                                            alt="Xem trước ảnh thư viếng thăm" 
                                            style={{width: '100%', height: '100%', objectFit: 'contain'}}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            Chưa có ảnh thư viếng thăm
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-3 justify-content-center">
                    <KLNButton
                        isLoading={isLoading}
                        options={KLNButtonEnum.primaryBtn}
                        onClick={handleSubmit}
                        disabled={!formData.name.trim() || isLoading}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >
                        {isLoading ? 'Đang lưu...' : 'Lưu'}
                    </KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        urlLink="#"
                        onClick={handleCancel}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >
                        Hủy
                    </KLNButton>
                </div>
            </div>
        </div>
    );
};

export default EditSolemnVisitLayout;
