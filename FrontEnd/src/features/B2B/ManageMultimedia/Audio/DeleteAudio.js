import {KLNModal} from "~/components";
import React, {useReducer} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {deleteAudio} from '~/store/B2B/ManageMultimedia/actions';
import reducer, {initialState} from "~/store/B2B/ManageMultimedia/reducer";

const DeleteAudio = () => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {audio, audioList} = state;

    return (
        <>
            <KLNModal
                visible={deleteAction}
                setVisible={setDeleteAction}
                position={'top'}
                labelSave='Delete'
                labelCancel='Cancel'
                btnSaveOnClick={() => setDeleteAction(false)}
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
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa không ?</p>
            </KLNModal>
        </>
    )
}

export default DeleteAudio;