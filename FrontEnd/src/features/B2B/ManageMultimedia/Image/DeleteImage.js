import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {deleteImageAction} from '~/store/B2B/ManageMultimedia/actions';
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";

const DeleteImage = () => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {image, dispatch} = useManageMultimediaContext();

    const onClickDeleteItem = useCallback(() => {
        // api
        dispatch(deleteImageAction([image]));
        setDeleteAction(false);
    }, [image]);

    return (
        <>
            <KLNModal
                visible={deleteAction}
                setVisible={setDeleteAction}
                position={'top'}
                labelSave='Delete'
                labelCancel='Cancel'
                btnSaveOnClick={onClickDeleteItem}
                btnCancelOnClick={() => setDeleteAction(false)}
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginRight: 20,
                }}
            >
                <p style={{
                    fontWeight: "bold",
                    fontSize: 21,
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa hình '{image?.capture}' không ?</p>
            </KLNModal>
        </>
    );
}

export default DeleteImage;