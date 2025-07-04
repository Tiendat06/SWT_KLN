import {KLNColumn, KLNDataTable, KLNReactPaginate, KLNTableAction} from "~/components";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {videoService} from "~/services/VideoService";
import {useAdminContext} from "~/context/AdminContext";
import MediaType from "~/enum/MediaType/MediaType";
import DeleteVideo from "~/features/B2B/ManageMultimedia/Video/DeleteVideo";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {deleteVideoAction, getVideoAction, setVideoAction} from "~/store/B2B/ManageMultimedia/actions";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const VideoTable = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        selectedPageOption, setDeleteAction
    } = useAdminContext();
    const {
        visible,
        setVisible,
        isLoading,
        setIsLoading,
        dispatch,
        videoList,
        selectedItems,
        setSelectedItems,
        isUpdated
    } = useManageMultimediaContext();

    const handleBtnDeleteMany = useCallback(async () => {
        // api
        setIsLoading(true);
        dispatch(deleteVideoAction(selectedItems))
        setVisible(false);
        setIsLoading(false);
    }, [selectedItems]);

    const showModal = useCallback((videoItem) => {
        setDeleteAction(true);
        dispatch(setVideoAction(videoItem));
    }, []);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, [])

    useLayoutEffect(() => {
        const getVideoList = async () => {
            setIsLoading(true);
            const data = await videoService.getVideoListService(selectedPageOption.code, currentPage, MediaType.PresidentTDT);
            const videoData = data?.data?.items;
            dispatch(getVideoAction(videoData));
            setPageCount(Math.ceil(data?.data?.totalCount / selectedPageOption.code));
            setIsLoading(false);
        }
        getVideoList();
    }, [currentPage, selectedPageOption, isUpdated]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (video) => {
        return <img
            style={{
                width: 50,
            }}
            src={video?.videoImageLink}
            alt={video?.videoTitle}
            className="w-6rem shadow-2 border-round"/>;
    };

    const selectedOnCurrentPage = (videoList || []).filter(p =>
        selectedItems.some(s => s.videoId === p.videoId));

    const handleSelectionChange = (e) => {
        const selectedOnPage = e.value;
        const remaining = selectedItems.filter(
            item => !(videoList || []).some(p => p.videoId === item.videoId)
        );
        const updated = [...remaining, ...selectedOnPage];
        setSelectedItems(updated);
    };

    return (
        <>
            <div style={{
                borderRadius: 10
            }} className="card overflow-hidden mb-5">
                <KLNDataTable
                    loading={isLoading}
                    value={videoList}
                    tableStyle={{minWidth: '60rem'}}
                    selectionMode="multiple"
                    selection={selectedOnCurrentPage}
                    onSelectionChange={handleSelectionChange}
                >
                    <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn body={(rowData, {rowIndex}) =>
                        <span>{(rowIndex + 1) + ((currentPage - 1) * selectedPageOption.code)}</span>} header="#"
                               headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}}
                               header="Thumnails" body={imageBodyTemplate}></KLNColumn>
                    <KLNColumn field="videoTitle" header="Tiêu đề"></KLNColumn>
                    <KLNColumn headerStyle={{width: 150}} bodyStyle={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} header="Thao tác" body={(rowData) => (<KLNTableAction
                        editActionLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia/video/${rowData.videoId}`}
                        onClickDelete={() => showModal(rowData)}
                    />)}></KLNColumn>
                </KLNDataTable>
            </div>
            <KLNReactPaginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
            <DeleteVideo/>
            <DeleteMany
                isLoading={isLoading}
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleBtnDeleteMany}
                btnCancelOnClick={hideModal}
            />
        </>
    )
}

export default VideoTable;