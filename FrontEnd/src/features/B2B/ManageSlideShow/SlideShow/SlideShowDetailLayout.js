import React, { useCallback, useEffect, useState } from 'react';
import { KLNBreadCrumb, KLNButton, KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableAction } from '~/components';
import { Dropdown } from 'primereact/dropdown';
import { faTrash, faImage } from '@fortawesome/free-solid-svg-icons';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import AddImageModal from '../Image/AddImageModal';
import EditImageModal from '../Image/EditImageModal';
import DeleteImageModal from '../Image/DeleteImageModal';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import { DateTimeFormat } from '~/utils/DateTimeFormat';
import { setSlideshowImageAction, getSlideshowImagesAction, setSlideshowDetailAction } from '~/store/B2B/ManageSlideShow/actions';
import { slideShowService } from '~/services/SlideShowService';
import { Link } from 'react-router-dom';
import { useAppContext } from '~/context/AppContext';
import { showToast } from '~/utils/Toast';

// Mock data (fallback)
const mockDetail = {
    slideShowId: '1',
    title: 'Nhà trưng bày 1',
    description: 'Mô tả nhà trưng bày 1',
    createDate: '2025-03-21T00:28:00.000Z',
    slideImage: [
        { id: 1, capture: 'Ảnh 1', imageLink: 'https://via.placeholder.com/100x70/0066cc/ffffff?text=Image+1', createDate: '2025-03-21T00:28:00.000Z' },
        { id: 2, capture: 'Ảnh 2', imageLink: 'https://via.placeholder.com/100x70/cc6600/ffffff?text=Image+2', createDate: '2025-03-21T00:28:00.000Z' }
    ]
};

const pageSizeOptions = [
    { name: "5", code: 5 },
    { name: "10", code: 10 },
    { name: "15", code: 15 },
    { name: "25", code: 25 },
    { name: "50", code: 50 }
];

const SlideShowDetailLayout = ({ slideShowId }) => {
    const {
        slideshows, 
        slideshowImages,
        slideshowDetail,
        setAddImageModalVisible, 
        setEditImageModalVisible,
        selectedImages, 
        setSelectedImages,
        setDeleteImageModalVisible,
        isUpdated,
        dispatch
    } = useManageSlideshowContext();
    
    const { toast } = useAppContext();
    
    const [detail, setDetail] = useState(null);
    const [selectedPageOption, setSelectedPageOption] = useState({ name: "10", code: 10 });
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSlideshowDetail = useCallback(async () => {
        setLoading(true);
        try {
            let found = slideshows.find(s => s.slideShowId === slideShowId);
            
            if (!found) {
                const result = await slideShowService.getSlideShowByIdService(slideShowId);
                if (result && result.data) {
                    found = result.data;
                } else {
                    const errorMessage = result?.message || 'API response invalid';
                    throw new Error(errorMessage);
                }
            }
            
            setDetail(found);
            
            const images = found?.slideImage || [];
            setAllImages(images);
            
            dispatch(setSlideshowDetailAction(found));
            
        } catch (error) {
            console.error('Error fetching slideshow detail:', error);
            const errorMessage = error?.message || 'Có lỗi xảy ra khi tải chi tiết slideshow';
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Lỗi tải dữ liệu',
                detail: errorMessage
            });
        } finally {
            setLoading(false);
        }
    }, [slideShowId, slideshows, dispatch]);

    useEffect(() => {
        fetchSlideshowDetail();
    }, [fetchSlideshowDetail]);

    const paginateSlideImages = useCallback(() => {
        const startIndex = currentPage * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedImages = allImages.slice(startIndex, endIndex);
        
        dispatch(getSlideshowImagesAction(paginatedImages));
        setPageCount(Math.ceil(allImages.length / selectedPageOption.code));
    }, [allImages, currentPage, selectedPageOption.code, dispatch]);

    const handlePageSizeChange = (newPageOption) => {
        setSelectedPageOption(newPageOption);
        setCurrentPage(0);
    };

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected);
    }, []);

    useEffect(() => {
        if (allImages.length > 0) {
            paginateSlideImages();
        } else {
            dispatch(getSlideshowImagesAction([]));
            setPageCount(0);
        }
    }, [allImages, paginateSlideImages]);

    useEffect(() => {
        if (slideshowDetail && slideshowDetail.slideImage) {
            setAllImages(slideshowDetail.slideImage);
            dispatch(getSlideshowImagesAction(slideshowDetail.slideImage));
        }
    }, [slideshowDetail]);

    // Force refresh khi isUpdated thay đổi
    useEffect(() => {
        if (isUpdated !== undefined) {
            fetchSlideshowDetail();
        }
    }, [isUpdated, fetchSlideshowDetail]);

    const displayImages = slideshowImages;

    const handleAddImage = () => setAddImageModalVisible(true);
    
    const handleDeleteImages = () => {
        if (selectedImages.length > 0) {
            setDeleteImageModalVisible(true);
        }
    };

    const handleSingleImageDelete = (image) => {
        dispatch(setSlideshowImageAction(image));
        setDeleteImageModalVisible(true);
    };

    const handleSingleImageEdit = (image) => {
        dispatch(setSlideshowImageAction(image));
        setEditImageModalVisible(true);
    };

    const indexTemplate = (rowData, { rowIndex }) => (
        <span>{(currentPage * selectedPageOption.code) + rowIndex + 1}</span>
    );
    
    const thumbnailTemplate = (rowData) => (
        <img src={rowData.imageLink} alt={rowData.capture} style={{ width: 50 }} className="w-6rem shadow-2 border-round" />
    );
    
    const captureTemplate = (rowData) => (
        <span>{rowData.capture}</span>
    );
    
    const dateTemplate = (rowData) => DateTimeFormat(rowData.createDate);
    
    const actionTemplate = (rowData) => (
        <KLNTableAction
            onClickEdit={() => handleSingleImageEdit(rowData)}
            onClickDelete={() => handleSingleImageDelete(rowData)}
        />
    );

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Slideshow</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-exhibition`}>Nhà trưng bày</Link> },
        { template: () => <span>Chi tiết</span> }
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
                <span>Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <>
            <h2 style={{ marginLeft: 15, fontWeight: 'bold' }}>{detail?.title || 'Chi tiết danh mục'}</h2>
            <KLNBreadCrumb items={items} />
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div></div>
                <div>
                    <KLNButton
                        style={{ marginRight: 20, fontWeight: 'normal', opacity: selectedImages.length > 0 ? 1 : 0.6, cursor: selectedImages.length > 0 ? 'pointer' : 'not-allowed' }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{ marginLeft: 10, fontWeight: 'normal' }}
                        onClick={selectedImages.length > 0 ? handleDeleteImages : undefined}
                        disabled={selectedImages.length === 0}
                    >Xóa {selectedImages.length > 0 && `(${selectedImages.length})`}</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={faImage}
                        iconStyle={{ marginLeft: 10, fontWeight: 'normal' }}
                        style={{ fontWeight: 'normal', boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)', transition: 'all 0.3s ease' }}
                        onClick={handleAddImage}
                    >Thêm ảnh</KLNButton>
                </div>
            </div>
            <div style={{ paddingLeft: 32 }}>
                <div className={'mt-4 mb-4 d-flex align-items-center'}>
                    <p style={{ marginRight: 15, marginBottom: 0 }}>Số lượng hiển thị</p>
                    <Dropdown
                        value={selectedPageOption}
                        options={pageSizeOptions}
                        onChange={(e) => handlePageSizeChange(e.value)}
                        optionLabel="name"
                        placeholder="--N/A--"
                        pt={{
                            root: { style: { height: '30px' } },
                            input: { style: { padding: '8px 8px', lineHeight: '1', fontSize: 12 } },
                        }}
                    />
                </div>
                <div className="card overflow-hidden mb-5" style={{ borderRadius: 10 }}>
                    <KLNDataTable
                        value={displayImages}
                        tableStyle={{ minWidth: '60rem' }}
                        selectionMode="multiple"
                        selection={selectedImages}
                        onSelectionChange={e => setSelectedImages(e.value)}
                        dataKey="id"
                    >
                        <KLNColumn selectionMode="multiple" headerStyle={{ width: '3rem' }}></KLNColumn>
                        <KLNColumn body={indexTemplate} header="#" headerStyle={{ width: '3rem' }}></KLNColumn>
                        <KLNColumn headerStyle={{ width: '8rem' }} bodyStyle={{ width: '8rem', textAlign: 'center' }} header="Thumbnail" body={thumbnailTemplate} />
                        <KLNColumn field="capture" header="Nội dung" body={captureTemplate} />
                        <KLNColumn headerStyle={{ width: 150 }} bodyStyle={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} header="Thao tác" body={actionTemplate} />
                    </KLNDataTable>
                </div>
                <KLNReactPaginate pageCount={pageCount} handlePageClick={handlePageClick} forcePage={currentPage} />
            </div>
            <AddImageModal slideShowId={slideShowId} />
            <EditImageModal slideShowId={slideShowId} />
            <DeleteImageModal slideshowId={slideShowId} />
        </>
    );
};

export default SlideShowDetailLayout; 