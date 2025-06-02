import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {KLNReactPaginate, KLNTableAction} from "~/components";
import {useCallback, useLayoutEffect, useState} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {getMusicListService} from "~/services/MusicService";
import MediaType from "~/enum/MediaType/MediaType";
import DeleteAudio from "~/features/B2B/ManageMultimedia/Audio/DeleteAudio";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {deleteAudioAction, getAudioAction, setAudioAction} from "~/store/B2B/ManageMultimedia/actions";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const AudioTable = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        selectedPageOption, setDeleteAction
    } = useAdminContext();
    const {visible, setVisible, audioList, isUpdated, dispatch} = useManageMultimediaContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        dispatch(deleteAudioAction(selectedItems));
        setVisible(false);
    }, [selectedItems]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback((audioItem) => {
        setDeleteAction(true);
        dispatch(setAudioAction(audioItem))
    }, []);

    useLayoutEffect(() => {
        const getAudioList = async () => {
            const data = await getMusicListService(selectedPageOption.code, currentPage, MediaType.PresidentTDT);
            const audioData = data?.data?.items;
            dispatch(getAudioAction(audioData));
            setPageCount(Math.ceil(data?.data?.totalCount / selectedPageOption.code))
        }
        getAudioList();
    }, [currentPage, selectedPageOption, isUpdated]);

    const handlePageClick = useCallback( (event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (video) => {
        return <img
            style={{
                width: 50,
            }}
            src={video?.imageLink}
            alt={video?.musicTitle}
            className="w-6rem shadow-2 border-round" />;
    };

    const indexTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
    }

    return (
        <>
            <div className="">
                <div style={{
                    borderRadius: 10
                }} className="card overflow-hidden mb-5">
                    <DataTable
                        value={audioList}
                        tableStyle={{ minWidth: '60rem' }}
                        selectionMode="multiple"
                        selection={selectedItems}
                        onSelectionChange={(e) => setSelectedItems(e.value)}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column body={indexTemplate} header="#" headerStyle={{ width: '3rem' }}></Column>
                        <Column headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}} header="Thumnails" body={imageBodyTemplate}></Column>
                        <Column field="musicTitle" header="Tiêu đề"></Column>
                        <Column field="musicAuthor" header="Nhạc sĩ"></Column>
                        <Column headerStyle={{width: '10rem'}} bodyStyle={{
                            width: '10rem',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }} header="Thao tác" body={(rowData) => (<KLNTableAction
                            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia/music/${rowData.musicId}`}
                            onClickDelete={() => showModal(rowData)}
                        />)}></Column>
                    </DataTable>
                </div>
                <KLNReactPaginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
                <DeleteAudio />
                <DeleteMany
                    visible={visible}
                    setVisible={setVisible}
                    btnSaveOnClick={handleDeleteMany}
                    btnCancelOnClick={hideModal}
                />
            </div>
        </>
    )
}

export default AudioTable;