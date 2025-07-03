import {magazineService} from "~/services/MagazineService";
import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {useCallback, useLayoutEffect, useState} from 'react';
import {useAdminContext} from "~/context/AdminContext";
import KLNDataTable from "~/components/KLNTable/KLNDataTable";
import {KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import {deleteMagazineAction, getMagazineAction} from "~/store/B2B/ManageMagazine/actions";
import {DateTimeFormat} from "~/utils";

const MagazineTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const {selectedPageOption, setDeleteAction} = useAdminContext();

    const {
        visible,
        setVisible,
        isLoading,
        setIsLoading,
        magazineList,
        dispatch,
        selectedItems,
        setSelectedItems
    } = useManageMagazineContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        setIsLoading(true);
        // const deleteSlideImages = await slideShowService.deleteSlideImageInSpecificSlideShowBySlideShowIdService(selectedItems.map(item => item.id), slideShowId);
        // if (deleteSlideImages)
        dispatch(deleteMagazineAction(selectedItems));
        setVisible(false);
        setIsLoading(false);
    }, [selectedItems]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback(() => {
        setDeleteAction(true);
    }, []);

    useLayoutEffect(() => {
        const getMagazineList = async () => {
            setIsLoading(true);
            const magazineListData = await magazineService.getMagazineListService(selectedPageOption.code, currentPage);
            dispatch(getMagazineAction(magazineListData?.data?.items));
            setPageCount(Math.ceil((magazineListData?.data?.totalCount || 0) / selectedPageOption.code));
            setIsLoading(false);
        }
        getMagazineList();
    }, [currentPage, selectedPageOption]);

    const imageBodyTemplate = (rowData) => {
        return <img
            style={{
                width: 50,
            }}
            src={rowData.image}
            alt={rowData.title}
            className="w-6rem shadow-2 border-round"/>;
    };

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const selectedOnCurrentPage = (magazineList || []).filter(p =>
        selectedItems.some(s => s.magazineId === p.magazineId)
    );

    const handleSelectionChange = (e) => {
        const selectedOnPage = e.value;
        const remaining = selectedItems.filter(
            item => !(magazineList || []).some(p => p.magazineId === item.magazineId)
        );
        const updated = [...remaining, ...selectedOnPage];
        setSelectedItems(updated);
    };

    return (
        <div className="">
            <div style={{
                borderRadius: 10
            }} className="card overflow-hidden mb-5">
                <KLNDataTable
                    loading={isLoading}
                    value={magazineList}
                    tableStyle={{minWidth: '60rem'}}
                    selectionMode="multiple"
                    selection={selectedOnCurrentPage}
                    onSelectionChange={handleSelectionChange}
                >
                    <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn
                        body={(rowData, {rowIndex}) => (rowIndex + 1) + ((currentPage - 1) * selectedPageOption.code)}
                        header="#" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn header="Thumnails" body={imageBodyTemplate} headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn field="title"
                               header="Tiêu đề"
                               body={(rowData) => (
                                   <div
                                       style={{
                                           display: '-webkit-box',
                                           WebkitLineClamp: 1,
                                           WebkitBoxOrient: 'vertical',
                                           overflow: 'hidden',
                                           textOverflow: 'ellipsis',
                                           maxWidth: '200px'
                                       }}
                                       title={rowData.title}
                                   >
                                       {rowData.title}
                                   </div>
                               )}></KLNColumn>
                    <KLNColumn header="Ngày tạo" body={(rowData) => DateTimeFormat(rowData.createDate)}></KLNColumn>
                    <KLNColumn headerStyle={{width: 150}} bodyStyle={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} header="Thao tác" body={(rowData) => (<KLNTableAction
                        editActionLink={`${AppRoutesEnum.AdminRoute}/manage-magazine/magazine/${rowData.magazineId}`}
                        onClickDelete={() => showModal(rowData)}
                    />)}></KLNColumn>
                </KLNDataTable>
            </div>
            <KLNReactPaginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
            <DeleteMany
                isLoading={isLoading}
                visible={visible}
                setVisible={setVisible}
                btnSaveOnClick={handleDeleteMany}
                btnCancelOnClick={hideModal}
            />
        </div>
    )
}

export default MagazineTable;