import {KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import {useEffect, useState, useCallback} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {
    getTopicVideosAction,
    setTopicVideoAction,
    setTopicVideosLoadingAction
} from '~/store/B2B/ManageTopic/actions';

const TopicVideoTable = ({topicDetail}) => {
    const {selectedPageOption} = useAdminContext();
    const {
        selectedVideosInTable, setSelectedVideosInTable, setEditingVideo, setEditVideoModalVisible,
        topicVideos, isTopicVideosLoading, dispatch, setSelectedVideos, setDeleteVideoModalVisible
    } = useManageTopicContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    // Paginate videos when data changes
    const paginateVideos = useCallback((videosData) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = videosData.slice(startIndex, endIndex);
        // Also update store
        dispatch(getTopicVideosAction(paginatedData));
    }, [currentPage, selectedPageOption.code, dispatch]);

    useEffect(() => {
        if (topicDetail?.videos) {
            dispatch(setTopicVideosLoadingAction(true));
            
            const allVideosData = topicDetail.videos;
            setPageCount(Math.ceil(allVideosData.length / selectedPageOption.code));
            
            // Paginate videos
            paginateVideos(allVideosData);
            
            dispatch(setTopicVideosLoadingAction(false));
        }
    }, [topicDetail, selectedPageOption.code, paginateVideos, dispatch]);

    // Handle page changes
    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Reset to page 1 when page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedPageOption.code]);

    const onSelectionChange = (selection) => {
        setSelectedVideosInTable(selection);
    };

    const onEditVideo = (video) => {
        dispatch(setTopicVideoAction(video));
        setEditingVideo(video);
        setEditVideoModalVisible(true);
    };

    const onDeleteVideo = (video) => {
        dispatch(setTopicVideoAction(video));
        setSelectedVideos([video]);
        setDeleteVideoModalVisible(true);
    };

    const thumbnailBodyTemplate = (rowData) => {
        return (
            <div style={{position: 'relative', width: '80px', height: '80px'}}>
                <video 
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px'}}
                    poster=""
                >
                    <source src={rowData.videoLink} type="video/mp4" />
                </video>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    ▶
                </div>
            </div>
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <KLNTableAction
                onClickEdit={() => onEditVideo(rowData)}
                onClickDelete={() => onDeleteVideo(rowData)}
            />
        );
    };

    const sequenceBodyTemplate = (rowData, options) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        return startIndex + options.rowIndex + 1;
    };

    return (
        <>
            <div style={{borderRadius: 10}} className="card overflow-hidden mb-3">
                <KLNDataTable
                    value={topicVideos}
                    loading={isTopicVideosLoading}
                    loadingIcon={<i className="pi pi-spin pi-spinner" style={{fontSize: '2rem', color: '#3f51b5'}}/>}
                    selection={selectedVideosInTable}
                    onSelectionChange={(e) => onSelectionChange(e.value)}
                    dataKey="id"
                >
                    <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn 
                        field="sequence" 
                        header="#" 
                        body={sequenceBodyTemplate}
                        style={{width: '60px', textAlign: 'center'}}
                    />
                    <KLNColumn 
                        field="thumbnail" 
                        header="Thumbnail" 
                        body={thumbnailBodyTemplate}
                        style={{width: '120px'}}
                    />
                    <KLNColumn 
                        field="capture" 
                        header="Nội dung"
                        style={{minWidth: '250px'}}
                    />
                    <KLNColumn 
                        field="actions" 
                        header="Thao tác"
                        body={actionBodyTemplate}
                        headerStyle={{width: 150}} 
                        bodyStyle={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}
                    />
                </KLNDataTable>
            </div>
            
            <KLNReactPaginate
                pageCount={Math.max(pageCount, 1)}
                handlePageClick={handlePageClick}
            />
        </>
    );
};

export default TopicVideoTable; 