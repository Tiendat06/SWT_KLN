import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {KLNReactPaginate, KLNTableAction} from "~/components";
import {useCallback, useLayoutEffect, useState} from "react";
import {getVideoListService} from "~/services/VideoService";
import {useAdminContext} from "~/context/AdminContext";
import MediaType from "~/enum/MediaType/MediaType";
import DeleteVideo from "~/features/B2B/ManageMultimedia/Video/DeleteVideo";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {deleteVideoAction, getVideoAction, setVideoAction} from "~/store/B2B/ManageMultimedia/actions";

const VideoTable = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    // const [videoList, setVideoList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        selectedPageOption, setDeleteAction
    } = useAdminContext();
    const {visible, setVisible, isUpdated, dispatch, videoList} = useManageMultimediaContext();

    const handleBtnDeleteMany = useCallback(async () => {
        // api
        dispatch(deleteVideoAction(selectedItems))
        setVisible(false);
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
            const data = await getVideoListService(selectedPageOption.code, currentPage, MediaType.PresidentTDT);
            const videoData = data?.data?.items;
            dispatch(getVideoAction(videoData));
            setPageCount(Math.ceil(data?.data?.totalCount / selectedPageOption.code));
        }
        getVideoList();
    }, [currentPage, selectedPageOption, isUpdated]);

    const handlePageClick = useCallback( (event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (video) => {
        return <img
            style={{
                width: 50,
            }}
            src={video?.videoImageLink}
            alt={video?.videoTitle}
            className="w-6rem shadow-2 border-round" />;
    };

    const indexTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
    }

    return (
        <>
            <div style={{
                borderRadius: 10
            }} className="card overflow-hidden mb-5">
                <DataTable
                    value={videoList}
                    tableStyle={{ minWidth: '60rem' }}
                    selectionMode="multiple"
                    selection={selectedItems}
                    onSelectionChange={(e) => setSelectedItems(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column body={indexTemplate} header="#" headerStyle={{ width: '3rem' }}></Column>
                    <Column headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}} header="Thumnails" body={imageBodyTemplate}></Column>
                    <Column field="videoTitle" header="Tiêu đề"></Column>
                    <Column headerStyle={{width: '10rem'}} bodyStyle={{
                        width: '10rem',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} header="Thao tác" body={(rowData) => (<KLNTableAction
                        onClickDelete={() => showModal(rowData)}
                    />)}></Column>
                </DataTable>
            </div>
            <KLNReactPaginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
            <DeleteVideo />
            <DeleteMany
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleBtnDeleteMany}
                btnCancelOnClick={hideModal}
            />
        </>
    )
}

export default VideoTable;