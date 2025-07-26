import {KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import {faSquarePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, {useCallback, useEffect, useState} from "react";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {topicService} from "~/services/TopicService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import DeleteTopicModal from "./DeleteTopicModal";
import {DateTimeFormat} from "~/utils/DateTimeFormat";
import {
    getTopicsAction,
    deleteTopicAction,
    setLoadingAction
} from '~/store/B2B/ManageTopic/actions';
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";


// Mock data nếu API không hoạt động
const mockTopics = [
    {
        topicId: "1",
        capture: "Tháng 4-1919, mặc dù Chiến tranh thế giới lần thứ nhất (1914-1918) đã kết thúc, chính phủ...",
        createDate: "2025-01-23T10:30:00.000Z",
        userName: "Admin",
        images: [
            {
                id: 1,
                capture: "Ảnh Bác Tôn 1",
                imageLink: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Anh+Bac+Ton+1"
            },
            {
                id: 2,
                capture: "Ảnh Bác Tôn 2", 
                imageLink: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Anh+Bac+Ton+2"
            }
        ],
        videos: [
            {
                id: 1,
                capture: "Video Bác Tôn 1",
                videoLink: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            }
        ]
    },
    {
        topicId: "2", 
        capture: "Tháng 4-1919, mặc dù Chiến tranh thế giới lần thứ nhất (1914-1918) đã kết thúc, chính phủ...",
        createDate: "2025-01-23T09:15:00.000Z",
        userName: "Editor",
        images: [
            {
                id: 3,
                capture: "Ảnh lịch sử 1",
                imageLink: "https://via.placeholder.com/300x200/cc6600/ffffff?text=Lich+Su+1"
            }
        ],
        videos: [
            {
                id: 2,
                capture: "Video lịch sử 1", 
                videoLink: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            },
            {
                id: 3,
                capture: "Video lịch sử 2",
                videoLink: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            }
        ]
    },
    {
        topicId: "3",
        capture: "Tháng 4-1919, mặc dù Chiến tranh thế giới lần thứ nhất (1914-1918) đã kết thúc, chính phủ...",
        createDate: "2025-01-22T14:45:00.000Z", 
        userName: "Moderator",
        images: [
            {
                id: 4,
                capture: "Ảnh kỷ niệm 1",
                imageLink: "https://via.placeholder.com/300x200/006600/ffffff?text=Ky+Niem+1"
            },
            {
                id: 5,
                capture: "Ảnh kỷ niệm 2",
                imageLink: "https://via.placeholder.com/300x200/006600/ffffff?text=Ky+Niem+2"
            },
            {
                id: 6,
                capture: "Ảnh kỷ niệm 3",
                imageLink: "https://via.placeholder.com/300x200/006600/ffffff?text=Ky+Niem+3"
            }
        ],
        videos: []
    }
];

const TopicLayouts = () => {
    const {selectedPageOption, setDeleteAction} = useAdminContext();
    const {
        visible, setVisible, isUpdated,
        selectedTopics, setSelectedTopics, triggerDeleteSingle, resetSelection,
        topics, isLoading, dispatch
    } = useManageTopicContext();
    
    const [allTopics, setAllTopics] = useState([]);
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

    const handleDelete = useCallback(async (topicIds) => {
        try {
            const deleteResult = await topicService.deleteTopicService(topicIds);
            
            if (deleteResult) {
                dispatch(deleteTopicAction(topicIds));
                
                console.log('Topics deleted successfully');
                showToast({ toastRef: toast, severity: 'success', summary: 'Xóa chuyên đề', detail: 'Xóa chuyên đề thành công' });
            }
        } catch (error) {
            console.error('Error deleting topics:', error);
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa chuyên đề', detail: 'Có lỗi xảy ra khi xóa chuyên đề' });
        } finally {
            resetSelection();
        setVisible(false);
        }
    }, [resetSelection, setVisible, dispatch, toast]);

    const handleDeleteMany = useCallback(async () => {
        const topicIds = selectedTopics.map(topic => topic.topicId);
        await handleDelete(topicIds);
    }, [selectedTopics, handleDelete]);

    // Paginate topics when data changes
    const paginateTopics = useCallback((topicsData) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = topicsData.slice(startIndex, endIndex);
        dispatch(getTopicsAction(paginatedData));
    }, [currentPage, selectedPageOption.code, dispatch]);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                dispatch(setLoadingAction(true));
                const response = await topicService.getTopicListService(
                    1000,
                    1
                );
                
                if (response?.data) {
                    const topicsData = response.data.items || [];
                    setAllTopics(topicsData);
                    setPageCount(Math.ceil(topicsData.length / selectedPageOption.code));
                    paginateTopics(topicsData);
                } else {
                    setAllTopics(mockTopics);
                    setPageCount(Math.ceil(mockTopics.length / selectedPageOption.code));
                    paginateTopics(mockTopics);
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
                // Fallback to mock data
                setAllTopics(mockTopics);
                setPageCount(Math.ceil(mockTopics.length / selectedPageOption.code));
                paginateTopics(mockTopics);
            } finally {
                dispatch(setLoadingAction(false));
            }
        };

        fetchTopics();
    }, [selectedPageOption.code, isUpdated, paginateTopics, dispatch]);

    // Handle pagination when page or pageSize changes
    useEffect(() => {
        paginateTopics(allTopics);
    }, [currentPage, selectedPageOption, allTopics, paginateTopics]);

    // Cập nhật pageCount khi allTopics thay đổi
    useEffect(() => {
        const newPageCount = Math.ceil(allTopics.length / selectedPageOption.code);
        setPageCount(newPageCount);
        if (currentPage > newPageCount && newPageCount > 0) {
            setCurrentPage(newPageCount);
        } else if (allTopics.length === 0) {
            setCurrentPage(1);
        }
    }, [allTopics.length, selectedPageOption.code, currentPage]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Table template functions
    const onDelete = (topic) => {
        triggerDeleteSingle(topic);
    };

    const indexTemplate = (rowData, {rowIndex}) => {
        return <span>{((currentPage - 1) * selectedPageOption.code) + rowIndex + 1}</span>;
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <a 
                href={`${AppRoutesEnum.AdminRoute}/manage-topic/${rowData.topicId}`}
                style={{ textDecoration: 'none', fontWeight: '500' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
                {rowData.capture}
            </a>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return DateTimeFormat(rowData.createDate);
    };

    const actionBodyTemplate = (rowData) => (
        <KLNTableAction
            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-topic/${rowData.topicId}/edit`}
            onClickDelete={() => onDelete(rowData)}
        />
    );

    const items = [
        {template: () => <a href={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</a>},
        {template: () => <span>Danh sách chuyên đề</span>}
    ];

    return (
        <>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                Danh sách chuyên đề
            </h2>
            <KLNBreadCrumb items={items}/>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div></div>
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "normal",
                            opacity: selectedTopics.length > 0 ? 1 : 0.6,
                            cursor: selectedTopics.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={selectedTopics.length > 0 ? showDeleteModal : undefined}
                        disabled={selectedTopics.length === 0}
                    >Xóa {selectedTopics.length > 0 && `(${selectedTopics.length})`}</KLNButton>
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
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-topic/create`}
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
                            value={topics}
                            tableStyle={{minWidth: '60rem'}}
                            selectionMode="multiple"
                            selection={selectedTopics}
                            loadingIcon={<i className="pi pi-spin pi-spinner"
                                            style={{fontSize: '2rem', color: '#3f51b5'}}/>}
                            onSelectionChange={(e) => setSelectedTopics(e.value)}
                            dataKey="topicId"
                        >
                            <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn body={indexTemplate} header="#" headerStyle={{width: '3rem'}}></KLNColumn>
                            <KLNColumn 
                                field="capture" 
                                header="Tên chuyên đề"
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
            
            <DeleteTopicModal 
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleDeleteMany}
                btnCancelOnClick={hideModal}
                onDelete={handleDelete}
            />
        </>
    );
}

export default TopicLayouts; 