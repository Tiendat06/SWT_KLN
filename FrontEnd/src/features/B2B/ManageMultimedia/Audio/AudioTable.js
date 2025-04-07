import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {KLNReactPaginate, KLNTableAction} from "~/components";
import {useCallback, useLayoutEffect, useState} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {getMusicListService} from "~/services/MusicService";
import MediaType from "~/enum/MediaType/MediaType";
import DeleteAudio from "~/features/B2B/ManageMultimedia/Audio/DeleteAudio";

const AudioTable = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [audioList, setAudioList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        selectedPageOption, setDeleteAction
    } = useAdminContext();

    const showModal = useCallback(() => {
        setDeleteAction(true);
    }, []);

    useLayoutEffect(() => {
        const getAudioList = async () => {
            const data = await getMusicListService(selectedPageOption.code, currentPage, MediaType.PresidentTDT);
            const audioData = data?.data?.items;
            setAudioList(audioData);
            setPageCount(Math.ceil(data?.data?.totalCount / selectedPageOption.code))
        }
        getAudioList();
    }, [currentPage, selectedPageOption]);

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
                        }} header="Thao tác" body={<KLNTableAction
                            onClickDelete={showModal}
                        />}></Column>
                    </DataTable>
                </div>
                <KLNReactPaginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
                <DeleteAudio />
            </div>
        </>
    )
}

export default AudioTable;