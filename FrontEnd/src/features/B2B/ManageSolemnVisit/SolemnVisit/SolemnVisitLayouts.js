import {KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import {faSquarePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageSolemnVisitContext} from "~/context/B2B/ManageSolemnVisit/ManageSolemnVisitContext";
import {solemnVisitService} from "~/services/SolemnVisitService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import DeleteSolemnVisitModal from "./DeleteSolemnVisitModal";
import {DateTimeFormat} from "~/utils/DateTimeFormat";
import {
    getSolemnVisitsAction,
    deleteSolemnVisitAction,
    setLoadingAction
} from '~/store/B2B/ManageSolemnVisit/actions';
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";

// Mock data nếu API không hoạt động
const mockSolemnVisits = [
    {
        solemnVisitId: "1",
        solemnVisitName: "Chủ tịch nước: TRẦN ĐẠI QUANG",
        portraitImage: "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615245/KLN/solemnVisit/visitor/fng3m70vuu6vkdwimnnj.jpg",
        letterImage: "https://res.cloudinary.com/dydpf7z8u/image/upload/v1742615687/KLN/solemnVisit/letter/bfjnsgolyqv6sahqoho7.jpg",
        createDate: "2025-01-13T11:00:00",
        userId: "203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f"
    },
    {
        solemnVisitId: "2",
        solemnVisitName: "Thủ tướng: NGUYỄN XUÂN PHÚC",
        portraitImage: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Portrait+2",
        letterImage: "https://via.placeholder.com/300x200/cc6600/ffffff?text=Letter+2",
        createDate: "2025-01-12T10:30:00",
        userId: "203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f"
    },
    {
        solemnVisitId: "3",
        solemnVisitName: "Bộ trưởng: PHẠM BÌNH MINH",
        portraitImage: "https://via.placeholder.com/300x200/006600/ffffff?text=Portrait+3",
        letterImage: "https://via.placeholder.com/300x200/660066/ffffff?text=Letter+3",
        createDate: "2025-01-11T09:15:00",
        userId: "203ce6cd-b6eb-4045-a4c4-9cd574f2ea2f"
    }
];

const SolemnVisitLayouts = () => {
    const {selectedPageOption, setDeleteAction} = useAdminContext();
    const {
        visible, setVisible, isUpdated,
        selectedSolemnVisits, setSelectedSolemnVisits, triggerDeleteSingle, resetSelection,
        solemnVisits, isLoading, dispatch
    } = useManageSolemnVisitContext();
    
    const [allSolemnVisits, setAllSolemnVisits] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { toast } = useAppContext();

    const showDeleteModal = useCallback(() => {
        setDeleteAction(true);
        setVisible(true);
    }, [setVisible, setDeleteAction]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const handleDelete = useCallback(async (solemnVisitIds) => {
        try {
            if (!solemnVisitIds || solemnVisitIds.length === 0) {
                showToast({ toastRef: toast, severity: 'warning', summary: 'Xóa lãnh đạo viếng thăm', detail: 'Vui lòng chọn ít nhất một lãnh đạo để xóa' });
                return;
            }

            const deleteResult = await solemnVisitService.deleteSolemnVisitService(solemnVisitIds);
            
            if (deleteResult) {
                dispatch(deleteSolemnVisitAction(solemnVisitIds));
                
                showToast({ toastRef: toast, severity: 'success', summary: 'Xóa lãnh đạo viếng thăm', detail: 'Xóa lãnh đạo viếng thăm thành công' });
            } else {
                showToast({ toastRef: toast, severity: 'error', summary: 'Xóa lãnh đạo viếng thăm', detail: 'API không trả về kết quả hợp lệ' });
            }
        } catch (error) {
            console.error('Error deleting solemn visits:', error);
            const errorMessage = error?.message || 'Có lỗi xảy ra khi xóa lãnh đạo viếng thăm';
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa lãnh đạo viếng thăm', detail: errorMessage });
        } finally {
            resetSelection();
            setVisible(false);
        }
    }, [resetSelection, setVisible, dispatch, toast]);

    const handleDeleteMany = useCallback(async () => {
        const solemnVisitIds = selectedSolemnVisits.map(solemnVisit => solemnVisit.solemnVisitId);
        await handleDelete(solemnVisitIds);
    }, [selectedSolemnVisits, handleDelete]);

    // Paginate solemn visits when data changes
    const paginateSolemnVisits = useCallback((solemnVisitsData) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = solemnVisitsData.slice(startIndex, endIndex);
        dispatch(getSolemnVisitsAction(paginatedData));
    }, [currentPage, selectedPageOption.code, dispatch]);

    // Fetch solemn visits
    useEffect(() => {
        const fetchSolemnVisits = async () => {
            try {
                dispatch(setLoadingAction(true));
                const response = await solemnVisitService.getSolemnVisitListService(
                    1000,
                    1
                );
                
                if (response?.data) {
                    const solemnVisitsData = response.data.items || [];
                    setAllSolemnVisits(solemnVisitsData);
                    setPageCount(Math.ceil(solemnVisitsData.length / selectedPageOption.code));
                    paginateSolemnVisits(solemnVisitsData);
                } else {
                    setAllSolemnVisits(mockSolemnVisits);
                    setPageCount(Math.ceil(mockSolemnVisits.length / selectedPageOption.code));
                    paginateSolemnVisits(mockSolemnVisits);
                }
            } catch (error) {
                console.error('Error fetching solemn visits:', error);
                // Fallback to mock data
                setAllSolemnVisits(mockSolemnVisits);
                setPageCount(Math.ceil(mockSolemnVisits.length / selectedPageOption.code));
                paginateSolemnVisits(mockSolemnVisits);
            } finally {
                dispatch(setLoadingAction(false));
            }
        };

        fetchSolemnVisits();
    }, [selectedPageOption.code, isUpdated, paginateSolemnVisits, dispatch]);

    // Handle pagination when page or pageSize changes
    useEffect(() => {
        paginateSolemnVisits(allSolemnVisits);
    }, [currentPage, selectedPageOption, allSolemnVisits, paginateSolemnVisits]);

    // Cập nhật pageCount khi allSolemnVisits thay đổi
    useEffect(() => {
        const newPageCount = Math.ceil(allSolemnVisits.length / selectedPageOption.code);
        setPageCount(newPageCount);
        if (currentPage > newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount);
        } else if (allSolemnVisits.length === 0) {
            setCurrentPage(1);
        }
    }, [allSolemnVisits.length, selectedPageOption.code, currentPage]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Table template functions
    const onDelete = (solemnVisit) => {
        triggerDeleteSingle(solemnVisit);
    };

    const indexTemplate = (rowData, {rowIndex}) => {
        return <span>{((currentPage - 1) * selectedPageOption.code) + rowIndex + 1}</span>;
    };

    // Portrait image template
    const portraitImageBodyTemplate = (rowData) => {
        return (
            <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '8px' }}>
                <img
                    src={rowData.portraitImage}
                    alt={rowData.solemnVisitName}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
        );
    };

    // Letter image template
    const letterImageBodyTemplate = (rowData) => {
        return (
            <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '8px' }}>
                <img
                    src={rowData.letterImage}
                    alt={`Thư của ${rowData.solemnVisitName}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <Link 
                to={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit/${rowData.solemnVisitId}/edit`}
                style={{ textDecoration: 'none', fontWeight: '500' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
                {rowData.solemnVisitName}
            </Link>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return DateTimeFormat(rowData.createDate);
    };

    const actionBodyTemplate = (rowData) => (
        <KLNTableAction
            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit/${rowData.solemnVisitId}/edit`}
            onClickDelete={() => onDelete(rowData)}
        />
    );

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit`}>Lãnh đạo viếng thăm</Link>},
        {template: () => <span>Danh sách lãnh đạo viếng thăm</span>}
    ];

    return (
        <>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                Danh sách lãnh đạo viếng thăm
            </h2>
            <KLNBreadCrumb items={items}/>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div></div>
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "normal",
                            opacity: selectedSolemnVisits.length > 0 ? 1 : 0.6,
                            cursor: selectedSolemnVisits.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={selectedSolemnVisits.length > 0 ? showDeleteModal : undefined}
                        disabled={selectedSolemnVisits.length === 0}
                    >Xóa {selectedSolemnVisits.length > 0 && `(${selectedSolemnVisits.length})`}</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={faSquarePlus}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        style={{
                            fontWeight: "normal",
                            boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-solemn-visit/create`}
                    >Thêm mới</KLNButton>
                </div>
            </div>
            <div style={{
                paddingLeft: 32
            }} className="">
                <div className={clsx('mt-4 mb-4 d-flex align-items-center')}>
                    <p style={{
                        marginRight: 15,
                        marginBottom: 0
                    }}>Số lượng hiển thị</p>
                    <KLNCascadeSelect/>
                </div>
                
                {/* Table */}
                <div className="">
                    <div style={{
                        borderRadius: 10
                    }} className="card overflow-hidden mb-5">
                        <KLNDataTable
                            loading={isLoading}
                            value={solemnVisits}
                            tableStyle={{minWidth: '60rem'}}
                            selectionMode="multiple"
                            selection={selectedSolemnVisits}
                            loadingIcon={<i className="pi pi-spin pi-spinner"
                                            style={{fontSize: '2rem', color: '#3f51b5'}}/>}
                            onSelectionChange={(e) => setSelectedSolemnVisits(e.value)}
                            dataKey="solemnVisitId"
                        >
                            <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn body={indexTemplate} header="#" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn 
                                field="portraitImage" 
                                header="Ảnh lãnh đạo"
                                body={portraitImageBodyTemplate}
                                headerStyle={{width: '8rem'}}
                            />
                            <KLNColumn 
                                field="letterImage" 
                                header="Ảnh thư tay"
                                body={letterImageBodyTemplate}
                                headerStyle={{width: '8rem'}}
                            />
                            <KLNColumn 
                                field="solemnVisitName" 
                                header="Tên lãnh đạo"
                                body={nameBodyTemplate}
                            />
                            <KLNColumn 
                                field="createDate" 
                                header="Ngày cập nhật"
                                body={dateBodyTemplate}
                                headerStyle={{width: '12rem'}}
                            />
                            <KLNColumn 
                                headerStyle={{width: 150}} bodyStyle={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }} 
                                header="Thao tác" 
                                body={actionBodyTemplate}
                            />
                        </KLNDataTable>
                    </div>
                    <KLNReactPaginate
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </div>
            
            <DeleteSolemnVisitModal 
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleDeleteMany}
                btnCancelOnClick={hideModal}
                onDelete={handleDelete}
            />
        </>
    );
}

export default SolemnVisitLayouts;
