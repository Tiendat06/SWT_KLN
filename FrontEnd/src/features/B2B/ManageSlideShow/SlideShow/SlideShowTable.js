import React, { useCallback, useEffect, useState } from 'react';
import { KLNDataTable, KLNColumn, KLNButton, KLNReactPaginate, KLNTableAction } from '~/components';
import { Dropdown } from 'primereact/dropdown';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import { useNavigate, Link } from 'react-router-dom';
import AppRoutesEnum from '~/enum/Route/AppRoutesEnum';
import { DateTimeFormat } from '~/utils/DateTimeFormat';
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';
import { setSlideshowAction, getSlideshowsAction } from '~/store/B2B/ManageSlideShow/actions';
import DeleteSlideShowModal from './DeleteSlideShowModal';
import { slideShowService } from '~/services/SlideShowService';
import MediaType from '~/enum/MediaType/MediaType';
import SlideShowType from '~/enum/SlideShowType/SlideShowType';
import { useAppContext } from '~/context/AppContext';
import { showToast } from '~/utils/Toast';

// Mock data for slideshows (fallback)
const mockSlideshows = [
    {
        slideShowId: '1',
        title: 'Nhà trưng bày 1',
        description: 'Mô tả nhà trưng bày 1',
        createDate: '2025-03-21T00:28:00.000Z',
        slideImage: [
            { id: 1, capture: 'Ảnh 1', imageLink: 'https://via.placeholder.com/100x70/0066cc/ffffff?text=Image+1' }
        ]
    },
    {
        slideShowId: '2',
        title: 'Nhà trưng bày 2',
        description: 'Mô tả nhà trưng bày 2',
        createDate: '2025-03-21T00:28:00.000Z',
        slideImage: []
    }
];

const pageSizeOptions = [
    { name: "5", code: 5 },
    { name: "10", code: 10 },
    { name: "15", code: 15 },
    { name: "25", code: 25 },
    { name: "50", code: 50 }
];

const SlideShowTable = () => {
    const {
        slideshows, dispatch, visible, setVisible, selectedSlideshows, setSelectedSlideshows
    } = useManageSlideshowContext();
    const [allSlideshows, setAllSlideshows] = useState([]);
    const [displayedSlideshows, setDisplayedSlideshows] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPageOption, setSelectedPageOption] = useState({ name: "5", code: 5 });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useAppContext();

    const fetchSlideshows = useCallback(async () => {
        setLoading(true);
        try {
            const result = await slideShowService.getSlideShowListService(
                1000,
                1,
                MediaType.TDTMemorial,
                SlideShowType.ExhibitionHouse,
                ""
            );
            
            console.log('SlideShowTable - API response:', result);
            
            if (result && result.data) {
                let slideshowsData;
                
                if (result.data.data) {
                    slideshowsData = result.data.data;
                }
                else if (Array.isArray(result.data)) {
                    slideshowsData = result.data;
                }
                else if (result.data.items) {
                    slideshowsData = result.data.items;
                }
                else {
                    slideshowsData = result.data;
                }
                
                console.log('SlideShowTable - slideshowsData:', slideshowsData);
                console.log('SlideShowTable - is array?', Array.isArray(slideshowsData));
                
                const slideshowsArray = Array.isArray(slideshowsData) ? slideshowsData : [];
                
                console.log('SlideShowTable - final array:', slideshowsArray);
                
                setAllSlideshows(slideshowsArray);
                dispatch(getSlideshowsAction(slideshowsArray));
                
            } else {
                console.warn('API response structure invalid, falling back to mock data');
                throw new Error('API response invalid');
            }
        } catch (error) {
            console.warn('API lỗi, sử dụng mock data:', error);
            setAllSlideshows(mockSlideshows);
            dispatch(getSlideshowsAction(mockSlideshows));
        } finally {
            setLoading(false);
        }
    }, [dispatch, toast]);

    const paginateClientSide = useCallback(() => {
        const startIndex = currentPage * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = allSlideshows.slice(startIndex, endIndex);
        
        console.log('Pagination:', {
            currentPage,
            pageSize: selectedPageOption.code,
            startIndex,
            endIndex,
            totalItems: allSlideshows.length,
            paginatedData
        });
        
        setDisplayedSlideshows(paginatedData);
        setPageCount(Math.ceil(allSlideshows.length / selectedPageOption.code));
    }, [allSlideshows, currentPage, selectedPageOption.code]);

    useEffect(() => {
        fetchSlideshows();
    }, [fetchSlideshows]);

    useEffect(() => {
        if (allSlideshows.length > 0) {
            paginateClientSide();
        } else {
            setDisplayedSlideshows([]);
            setPageCount(0);
        }
    }, [allSlideshows, paginateClientSide]);

    const handlePageSizeChange = (newPageOption) => {
        console.log('Page size changed to:', newPageOption);
        setSelectedPageOption(newPageOption);
        setCurrentPage(0);
    };

    const handlePageClick = useCallback((event) => {
        console.log('Page clicked:', event.selected);
        setCurrentPage(event.selected);
    }, []);

    const onDelete = (slideshow) => {
        dispatch(setSlideshowAction(slideshow));
        setVisible(true);
    };

    const handleDeleteMany = () => {
        if (selectedSlideshows.length > 0) {
            setVisible(true);
        }
    };

    const handleAddNew = () => {
        navigate(`${AppRoutesEnum.AdminRoute}/manage-exhibition/create`);
    };

    const handleDeleteSlideshows = async (slideshowIds) => {
        try {
            const result = await slideShowService.deleteSlideshowService(slideshowIds);
            
            if (result && (result.data === true || result.success)) {
                await fetchSlideshows();
                setSelectedSlideshows([]);
                dispatch(setSlideshowAction(null));
                setVisible(false);
                
                showToast({ 
                    toastRef: toast, 
                    severity: 'success', 
                    summary: 'Xóa danh mục', 
                    detail: `Xóa ${slideshowIds.length} danh mục thành công!` 
                });
            } else {
                throw new Error('API delete failed');
            }
        } catch (error) {
            console.warn('API lỗi, sử dụng mock delete:', error);
            
            const updatedSlideshows = allSlideshows.filter(s => !slideshowIds.includes(s.slideShowId));
            setAllSlideshows(updatedSlideshows);
            setSelectedSlideshows([]);
            dispatch(setSlideshowAction(null));
            setVisible(false);
            
            showToast({ 
                toastRef: toast, 
                severity: 'success', 
                summary: 'Xóa danh mục', 
                detail: `Xóa ${slideshowIds.length} danh mục thành công! (Mock data)` 
            });
        }
    };

    const indexTemplate = (rowData, { rowIndex }) => (
        <span>{(currentPage * selectedPageOption.code) + rowIndex + 1}</span>
    );

    const nameBodyTemplate = (rowData) => (
        <Link 
            to={`${AppRoutesEnum.AdminRoute}/manage-exhibition/${rowData.slideShowId}`}
            style={{ textDecoration: 'none', fontWeight: '500' }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
            {rowData.title}
        </Link>
    );

    const dateBodyTemplate = (rowData) => DateTimeFormat(rowData.createDate);

    const thumbnailBodyTemplate = (rowData) => {
        // Try to get poster image first, if not available, use first slideImage
        const imageUrl = rowData.imageLink || (rowData.slideImage && rowData.slideImage.length > 0 ? rowData.slideImage[0].imageLink : null);
        
        if (imageUrl) {
            return (
                <img 
                    src={imageUrl} 
                    alt={rowData.title} 
                    style={{ width: 50, height: 35, objectFit: 'cover' }} 
                    className="border-round shadow-2" 
                />
            );
        }
        
        return (
            <div 
                style={{ 
                    width: 50, 
                    height: 35, 
                    backgroundColor: '#f0f0f0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#999'
                }} 
                className="border-round"
            >
                No Image
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => (
        <KLNTableAction
            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-exhibition/${rowData.slideShowId}/edit`}
            onClickDelete={() => onDelete(rowData)}
        />
    );

    return (
        <div className="pt-3" style={{ paddingLeft: 32 }}>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div></div>
                <div>
                    <KLNButton
                        style={{ marginRight: 20, fontWeight: 'normal', opacity: selectedSlideshows.length > 0 ? 1 : 0.6, cursor: selectedSlideshows.length > 0 ? 'pointer' : 'not-allowed' }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{ marginLeft: 10, fontWeight: 'normal' }}
                        onClick={selectedSlideshows.length > 0 ? handleDeleteMany : undefined}
                        disabled={selectedSlideshows.length === 0}
                    >Xóa {selectedSlideshows.length > 0 && `(${selectedSlideshows.length})`}</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={faSquarePlus}
                        iconStyle={{ marginLeft: 10, fontWeight: 'normal' }}
                        style={{ fontWeight: 'normal', boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)', transition: 'all 0.3s ease' }}
                        onClick={handleAddNew}
                    >Thêm mới</KLNButton>
                </div>
            </div>
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
            
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : (
                <>
                    <div className="card overflow-hidden mb-5" style={{ borderRadius: 10 }}>
                        <KLNDataTable
                            value={displayedSlideshows}
                            tableStyle={{ minWidth: '60rem' }}
                            selectionMode="multiple"
                            selection={selectedSlideshows}
                            onSelectionChange={e => setSelectedSlideshows(e.value)}
                            dataKey="slideShowId"
                        >
                            <KLNColumn selectionMode="multiple" headerStyle={{ width: '3rem' }}></KLNColumn>
                            <KLNColumn body={indexTemplate} header="#" headerStyle={{ width: '3rem' }}></KLNColumn>
                            <KLNColumn
                                field="thumbnail"
                                header="Ảnh đại diện"
                                body={thumbnailBodyTemplate}
                                headerStyle={{ width: 100 }}
                            />
                            <KLNColumn
                                field="title"
                                header="Tên danh mục"
                                body={nameBodyTemplate}
                            />
                            <KLNColumn
                                field="createDate"
                                header="Ngày cập nhật"
                                body={dateBodyTemplate}
                                headerStyle={{ width: '12rem' }}
                            />
                            <KLNColumn
                                headerStyle={{ width: 150 }}
                                bodyStyle={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                                header="Thao tác"
                                body={actionBodyTemplate}
                            />
                        </KLNDataTable>
                    </div>
                    <KLNReactPaginate
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                        forcePage={currentPage}
                    />
                </>
            )}
            <DeleteSlideShowModal
                visible={visible}
                setVisible={setVisible}
                onDelete={handleDeleteSlideshows}
            />
        </div>
    );
};

export default SlideShowTable; 