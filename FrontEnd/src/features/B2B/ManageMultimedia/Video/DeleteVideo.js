import {KLNModal} from "~/components";
import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {useCallback} from "react";
import {deleteVideoAction} from "~/store/B2B/ManageMultimedia/actions";

const DeleteVideo = () => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {video, dispatch} = useManageMultimediaContext();

    const onClickDeleteItem = useCallback(() => {
        // api
        dispatch(deleteVideoAction([video]));
        setDeleteAction(false);
    }, [video]);

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
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa video '{video?.videoTitle}' không ?</p>
            </KLNModal>
        </>
    );
}

export default DeleteVideo;