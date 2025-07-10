import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {useAdminContext} from "~/context/AdminContext";
import {bookService} from "~/services/BookService";
import KLNDataTable from "~/components/KLNTable/KLNDataTable";
import {KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import {deleteBookAction, getBookAction} from "~/store/B2B/ManageMagazine/actions";
import DeleteBook from "~/features/B2B/ManageMagazine/Book/DeleteBook";

const BookTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const {selectedPageOption, setDeleteAction} = useAdminContext();

    const {
        visible,
        setVisible,
        isLoading,
        setIsLoading,
        bookList,
        dispatch,
        selectedItems,
        setSelectedItems
    } = useManageMagazineContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        setIsLoading(true);
        // const deleteSlideImages = await slideShowService.deleteSlideImageInSpecificSlideShowBySlideShowIdService(selectedItems.map(item => item.id), slideShowId);
        // if (deleteSlideImages)
        dispatch(deleteBookAction(selectedItems));
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
        const getBookList = async () => {
            setIsLoading(true);
            const bookListData = await bookService.getBookListService(selectedPageOption.code, currentPage);
            dispatch(getBookAction(bookListData?.data?.items));
            setPageCount(Math.ceil((bookListData?.data?.totalCount || 0) / selectedPageOption.code));
            setIsLoading(false);
        }
        getBookList();
    }, [currentPage, selectedPageOption]);

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const selectedOnCurrentPage = (bookList || []).filter(p =>
        selectedItems.some(s => s.bookId === p.bookId));

    const handleSelectionChange = (e) => {
        const selectedOnPage = e.value;
        const remaining = selectedItems.filter(
            item => !(bookList || []).some(p => p.bookId === item.bookId)
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
                    dataKey="bookId"
                    loading={isLoading}
                    value={bookList}
                    tableStyle={{minWidth: '60rem'}}
                    selectionMode="multiple"
                    selection={selectedOnCurrentPage}
                    onSelectionChange={handleSelectionChange}
                >
                    <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn
                        body={(rowData, {rowIndex}) => (rowIndex + 1) + ((currentPage - 1) * selectedPageOption.code)}
                        header="#" headerStyle={{width: '3rem'}}></KLNColumn>
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
                    <KLNColumn field="publisher" header="Nhà xuất bản"></KLNColumn>
                    <KLNColumn style={{width: 250}} field="author" header="Tác giả"></KLNColumn>
                    <KLNColumn field="yearPublic" header="Năm xuất bản"></KLNColumn>
                    <KLNColumn headerStyle={{width: 150}} bodyStyle={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }} header="Thao tác" body={(rowData) => (<KLNTableAction
                        editActionLink={`${AppRoutesEnum.AdminRoute}/manage-magazine/${rowData.bookId}`}
                        onClickDelete={() => showModal(rowData)}
                    />)}></KLNColumn>
                </KLNDataTable>
            </div>
            <KLNReactPaginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
            <DeleteBook/>
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

export default BookTable;