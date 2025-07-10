import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {KLNBreadCrumb, KLNButton, KLNTabView, KLNCascadeSelect} from "~/components";
import {faTrash, faImage, faVideo} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {topicService} from "~/services/TopicService";
import TopicImageTable from "../Image/TopicImageTable";
import TopicVideoTable from "../Video/TopicVideoTable";
import {
    setTopicDetailAction
} from '~/store/B2B/ManageTopic/actions';
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

// Mock data chi tiết chuyên đề
const mockTopicDetail = {
    topicId: "1",
    capture: "Tháng 4-1919, mặc dù Chiến tranh thế giới lần thứ nhất (1914-1918) đã kết thúc, chính phủ...",
    description: "Mô tả chi tiết về chuyên đề này",
    createDate: "2025-01-23T10:30:00.000Z",
    userName: "Admin",
    images: [
        {
            id: 1,
            capture: "Ảnh Bác Tôn 1",
            imageLink: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Anh+Bac+Ton+1",
            createDate: "2025-01-23T10:30:00.000Z"
        },
        {
            id: 2,
            capture: "Ảnh Bác Tôn 2", 
            imageLink: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Anh+Bac+Ton+2",
            createDate: "2025-01-23T09:15:00.000Z"
        },
        {
            id: 7,
            capture: "Ảnh Bác Tôn 3",
            imageLink: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Anh+Bac+Ton+3",
            createDate: "2025-01-22T14:45:00.000Z"
        }
    ],
    videos: [
        {
            id: 3,
            capture: "Video Bác Tôn 1",
            videoLink: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            createDate: "2025-01-23T08:00:00.000Z"
        },
        {
            id: 4,
            capture: "Video Bác Tôn 2",
            videoLink: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
            createDate: "2025-01-22T16:30:00.000Z"
        }
    ]
};

const TopicDetailLayouts = ({topicId}) => {
    const {tabView, setTabView, setDeleteAction} = useAdminContext();
    const [tabViewData, setTabViewData] = useState([]);
    const {
        isUpdated,
        setAddImageModalVisible, setAddVideoModalVisible,
        topicDetail, dispatch, 
        selectedImagesInTable, setSelectedImagesInTable,
        selectedVideosInTable, setSelectedVideosInTable,
        setDeleteImageModalVisible, setDeleteVideoModalVisible,
        setSelectedImages, setSelectedVideos
    } = useManageTopicContext();

    const showDeleteModal = useCallback(() => {
        // Xóa nhiều dựa trên tab hiện tại và selected items
        if (tabView === TabViewEnum.TopicDetailTabImage) {
            // Set selected images từ selectedImagesInTable và show image delete modal
            setSelectedImages(selectedImagesInTable);
            setDeleteImageModalVisible(true);
        } else if (tabView === TabViewEnum.TopicDetailTabVideo) {
            // Set selected videos từ selectedVideosInTable và show video delete modal
            setSelectedVideos(selectedVideosInTable);
            setDeleteVideoModalVisible(true);
        }
    }, [tabView, selectedImagesInTable, selectedVideosInTable, setSelectedImages, setSelectedVideos, setDeleteImageModalVisible, setDeleteVideoModalVisible]);

    const showAddMediaModal = useCallback(() => {
        if (tabView === TabViewEnum.TopicDetailTabImage) {
            setAddImageModalVisible(true);
        } else if (tabView === TabViewEnum.TopicDetailTabVideo) {
            setAddVideoModalVisible(true);
        }
    }, [tabView, setAddImageModalVisible, setAddVideoModalVisible]);

    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.TopicDetailTabImage);
    }, [tabView, setTabView]);

    // Reset selection khi chuyển tab
    useEffect(() => {
        setSelectedImagesInTable([]);
        setSelectedVideosInTable([]);
    }, [tabView, setSelectedImagesInTable, setSelectedVideosInTable]);

    useEffect(() => {
        const getTopicDetail = async () => {
            try {
                const response = await topicService.getTopicByIdService(topicId);
                if (response?.data) {
                    dispatch(setTopicDetailAction(response.data));
                } else {
                    // Sử dụng mock data
                    dispatch(setTopicDetailAction(mockTopicDetail));
                }
            } catch (error) {
                console.error('Error fetching topic detail:', error);
                // Fallback to mock data
                dispatch(setTopicDetailAction(mockTopicDetail));
            }
        }
        
        getTopicDetail();
    }, [topicId, isUpdated, dispatch]);

    useEffect(() => {
        if (topicDetail) {
            setTabViewData([
                {
                    id: 1,
                    tabView: TabViewEnum.TopicDetailTabImage,
                    title: 'Ảnh',
                    totalCount: topicDetail.images?.length || 0
                },
                {
                    id: 2,
                    tabView: TabViewEnum.TopicDetailTabVideo,
                    title: 'Video clip',
                    totalCount: topicDetail.videos?.length || 0
                }
            ]);
        }
    }, [topicDetail]);

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-topic`}>Chuyên đề hay về Bác</Link>},
        {template: () => <span>Chi tiết chuyên đề</span>}
    ];

    if (!topicDetail) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#3f51b5' }} />
            </div>
        );
    }

    const currentMediaType = tabView === TabViewEnum.TopicDetailTabImage ? 'ảnh' : 'video';
    const mediaIcon = tabView === TabViewEnum.TopicDetailTabImage ? faImage : faVideo;
    const selectedCount = tabView === TabViewEnum.TopicDetailTabImage 
        ? selectedImagesInTable?.length || 0 
        : selectedVideosInTable?.length || 0;

    return (
        <>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {topicDetail.capture}
            </h2>
            
            <KLNBreadCrumb items={items}/>
            
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <KLNTabView
                    onClickTabView={() => setDeleteAction(false)}
                    data={tabViewData}
                />
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "normal",
                            opacity: selectedCount > 0 ? 1 : 0.6,
                            cursor: selectedCount > 0 ? 'pointer' : 'not-allowed'
                        }}
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={selectedCount > 0 ? showDeleteModal : undefined}
                        disabled={selectedCount === 0}
                    >
                        Xóa {currentMediaType} {selectedCount > 0 && `(${selectedCount})`}
                    </KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={mediaIcon}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        style={{
                            fontWeight: "normal",
                            boxShadow: '0 4px 8px rgba(173, 30, 50, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={showAddMediaModal}
                    >
                        Thêm {currentMediaType}
                    </KLNButton>
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
                
                {tabView === TabViewEnum.TopicDetailTabImage && (
                    <TopicImageTable topicDetail={topicDetail} />
                )}
                {tabView === TabViewEnum.TopicDetailTabVideo && (
                    <TopicVideoTable topicDetail={topicDetail} />
                )}
            </div>
        </>
    );
}

export default TopicDetailLayouts;