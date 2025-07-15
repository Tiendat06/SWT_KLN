import {useAdminContext} from "~/context/AdminContext";
import React, {useCallback} from "react";
import {KLNModal} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {check_icon} from "~/assets/img";
import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {deleteBookAction} from "~/store/B2B/ManageMagazine/actions";
import {bookService} from "~/services/BookService";
import {showToast} from "~/utils/Toast";
import {useAppContext} from "~/context/AppContext";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";

const DeleteBook = () => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {toast} = useAppContext();
    const {book, dispatch, setSelectedItems, setIsLoading, isLoading} = useManageMagazineContext()

    const onClickDeleteItem = useCallback(async () => {
        // api
        setIsLoading(true);
        const deleteBooks = await bookService.deleteManyBookService([book.bookId]);
        let severity = 'error';
        if (deleteBooks.status === HttpStatusEnum.Ok) {
            dispatch(deleteBookAction([book]));
            severity = 'success';
        }
        showToast({
            toastRef: toast,
            severity: severity,
            summary: 'Xóa sách',
            detail: deleteBooks.message,
        });
        setDeleteAction(false);
        setSelectedItems([]);
        setIsLoading(false);
    }, [book]);

    return (
        <>
            <KLNModal
                isLoading={isLoading}
                size="sm"
                visible={deleteAction}
                setVisible={setDeleteAction}
                position={'middle'}
                labelSave='Xác nhận'
                labelCancel='Bỏ qua'
                headerStyle={{
                    padding: "5px 10px 0 10px"
                }}
                contentStyle={{
                    paddingBottom: 10
                }}
                btnSaveOnClick={onClickDeleteItem}
                btnCancelOnClick={() => setDeleteAction(false)}
                buttonSaveOptions={KLNButtonEnum.blackBtn}
                buttonCloseOptions={KLNButtonEnum.whiteBtn}
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginLeft: 20,
                }}
            >
                <div className="">
                    <div className="d-flex">
                        <img src={check_icon} alt=""/>
                        <p className="mb-0 text-dark" style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginLeft: 5
                        }}>
                            Bạn có chắc chắn muốn xóa không?
                        </p>
                    </div>
                    <p style={{
                        fontSize: 16,
                    }} className="mb-0 text-dark">Mục bạn chọn sẽ được xóa khỏi danh sách.</p>
                </div>
            </KLNModal>
        </>
    )
}

export default DeleteBook;