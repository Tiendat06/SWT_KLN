import {KLNColumn, KLNDataTable, KLNReactPaginate, KLNTableAction} from "~/components";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {musicService} from "~/services/MusicService";
import MediaType from "~/enum/MediaType/MediaType";
import DeleteAudio from "~/features/B2B/ManageMultimedia/Audio/DeleteAudio";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {deleteAudioAction, getAudioAction, setAudioAction} from "~/store/B2B/ManageMultimedia/actions";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const AudioTable = () => {
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
        audioList,
        dispatch,
        selectedItems,
        setSelectedItems,
        isUpdated
    } = useManageMultimediaContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        setIsLoading(true);
        dispatch(deleteAudioAction(selectedItems));
        setVisible(false);
        setIsLoading(false);
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
            setIsLoading(true);
            const data = await musicService.getMusicListService(selectedPageOption.code, currentPage, MediaType.PresidentTDT);
            const audioData = data?.data?.items;
            dispatch(getAudioAction(audioData));
            setPageCount(Math.ceil(data?.data?.totalCount / selectedPageOption.code))
            setIsLoading(false);
        }
        getAudioList();
    }, [currentPage, selectedPageOption, isUpdated]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (video) => {
        return <img
            style={{
                width: 50,
            }}
            src={video?.imageLink}
            alt={video?.musicTitle}
            className="w-6rem shadow-2 border-round"/>;
    };

    const selectedOnCurrentPage = (audioList || []).filter(p =>
        selectedItems.some(s => s.musicId === p.musicId)
    );

    const handleSelectionChange = (e) => {
        const selectedOnPage = e.value;
        const remaining = selectedItems.filter(
            item => !(audioList || []).some(p => p.musicId === item.musicId)
        );
        const updated = [...remaining, ...selectedOnPage];
        setSelectedItems(updated);
    };

    return (
        <>
            <div className="">
                <div style={{
                    borderRadius: 10
                }} className="card overflow-hidden mb-5">
                    <KLNDataTable
                        loading={isLoading}
                        value={audioList}
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
                        <KLNColumn field="musicTitle" header="Tiêu đề"></KLNColumn>
                        <KLNColumn field="musicAuthor" header="Nhạc sĩ"></KLNColumn>
                        <KLNColumn headerStyle={{width: 150}} bodyStyle={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }} header="Thao tác" body={(rowData) => (<KLNTableAction
                            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia/${rowData.musicId}`}
                            onClickDelete={() => showModal(rowData)}
                        />)}></KLNColumn>
                    </KLNDataTable>
                </div>
                <KLNReactPaginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
                <DeleteAudio/>
                <DeleteMany
                    isLoading={isLoading}
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