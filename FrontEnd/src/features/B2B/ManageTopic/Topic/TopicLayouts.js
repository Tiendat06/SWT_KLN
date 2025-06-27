import {KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNDataTable, KLNColumn, KLNReactPaginate} from "~/components";
import {faSquarePlus, faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {topicService} from "~/services/TopicService";
import CreateTopicModal from "./CreateTopicModal";
import EditTopicModal from "./EditTopicModal";
import DeleteTopicModal from "./DeleteTopicModal";
import {DateTimeFormat} from "~/utils/DateTimeFormat";
import {
    getTopicsAction,
    setTopicAction,
    deleteTopicAction,
    setLoadingAction
} from '~/store/B2B/ManageTopic/actions';

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
        visible, setVisible, isUpdated, setIsUpdated, setCreateTopicModalVisible, setEditTopicModalVisible,
        selectedTopics, setSelectedTopics, setEditingTopic, triggerDeleteSingle,
        topics, isLoading, dispatch
    } = useManageTopicContext();
    
    const [allTopics, setAllTopics] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const showDeleteModal = useCallback(() => {
        setDeleteAction(true);
        setVisible(true);
    }, [setVisible, setDeleteAction]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const showCreateModal = useCallback(() => {
        setCreateTopicModalVisible(true);
    }, [setCreateTopicModalVisible]);

    const handleDeleteMany = useCallback(async () => {
        try {
            // API call to delete selected topics
            const topicIds = selectedTopics.map(topic => topic.topicId);
            const deleteResult = await topicService.deleteTopicService(topicIds);
            
            if (deleteResult) {
                dispatch(deleteTopicAction(topicIds));
                console.log('Topics deleted successfully');
                setIsUpdated(prev => !prev);
            }
        } catch (error) {
            console.error('Error deleting topics:', error);
        }
        
        setSelectedTopics([]);
        setVisible(false);
    }, [selectedTopics, setSelectedTopics, setVisible, setIsUpdated, dispatch]);

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
                    
                    // Set initial paginated data
                    paginateTopics(topicsData);
                } else {
                    setAllTopics(mockTopics);
                    setPageCount(Math.ceil(mockTopics.length / selectedPageOption.code));
                    
                    // Set initial paginated data
                    paginateTopics(mockTopics);
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
                // Fallback to mock data
                setAllTopics(mockTopics);
                setPageCount(Math.ceil(mockTopics.length / selectedPageOption.code));
                
                // Set initial paginated data
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

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Table template functions
    const onEdit = (topic) => {
        dispatch(setTopicAction(topic));
        setEditingTopic(topic);
        setEditTopicModalVisible(true);
    };

    const onDelete = (topic) => {
        dispatch(setTopicAction(topic));
        triggerDeleteSingle(topic);
    };

    const indexTemplate = (rowData, {rowIndex}) => {
        return <span>{((currentPage - 1) * selectedPageOption.code) + rowIndex + 1}</span>;
    };

    const thumbnailBodyTemplate = (rowData) => {
        const firstImage = rowData.images?.[0];
        const firstVideo = rowData.videos?.[0];
        
        if (firstImage) {
            return (
                <img 
                    src={firstImage.imageLink} 
                    alt={firstImage.capture}
                    style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}}
                />
            );
        } else if (firstVideo) {
            return (
                <div style={{position: 'relative', width: '50px', height: '50px'}}>
                    <div style={{
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: 'white',
                            fontSize: '14px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}>
                            ▶
                        </div>
                    </div>
                </div>
            );
        }
        
        return (
            <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999'
            }}>
                📁
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <Link 
                to={`${AppRoutesEnum.AdminRoute}/manage-topic/${rowData.topicId}`}
                style={{ textDecoration: 'none', fontWeight: '500' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
                {rowData.capture}
            </Link>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return DateTimeFormat(rowData.createDate);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex gap-2 justify-content-center">
                <button 
                    className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                    onClick={() => onEdit(rowData)}
                    title="Sửa chuyên đề"
                    style={{width: '32px', height: '32px'}}
                >
                    <FontAwesomeIcon icon={faEdit} size="sm" />
                </button>
                <button 
                    className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                    onClick={() => onDelete(rowData)}
                    title="Xóa chuyên đề"
                    style={{width: '32px', height: '32px'}}
                >
                    <FontAwesomeIcon icon={faTrash} size="sm" />
                </button>
            </div>
        );
    };

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</Link>}
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
                        options={4}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={selectedTopics.length > 0 ? showDeleteModal : undefined}
                        disabled={selectedTopics.length === 0}
                    >Xóa {selectedTopics.length > 0 && `(${selectedTopics.length})`}</KLNButton>
                    <KLNButton
                        options={5}
                        icon={faSquarePlus}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #AD1E32 0%, #D22F27 100%)',
                            border: 'none',
                            fontWeight: "normal",
                            boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={showCreateModal}
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
                                headerStyle={{width: '8rem'}} 
                                bodyStyle={{width: '8rem', textAlign: 'center'}}
                                header="Thumbnail" 
                                body={thumbnailBodyTemplate}
                            />
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
                                headerStyle={{width: '10rem'}} 
                                bodyStyle={{
                                    width: '10rem',
                                    display: 'flex',
                                    justifyContent: 'center',
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
            
            <CreateTopicModal />
            <EditTopicModal />
            <DeleteTopicModal 
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleDeleteMany}
                btnCancelOnClick={hideModal}
            />
        </>
    );
}

export default TopicLayouts; 