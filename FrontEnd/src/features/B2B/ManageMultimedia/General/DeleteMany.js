import {KLNModal} from "~/components";
import React from "react";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";

const DeleteMany = () => {
    const {visible, setVisible} = useManageMultimediaContext();

    return (
        <>
            <KLNModal
                visible={visible}
                setVisible={setVisible}
                position={'top'}
                labelSave='Delete'
                labelCancel='Cancel'
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginRight: 20,
                }}
                btnSaveOnClick={() => setVisible(false)}
                btnCancelOnClick={() => setVisible(false)}
            >
                <p style={{
                    fontWeight: "bold",
                    fontSize: 21,
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa không ?</p>
            </KLNModal>
        </>
    );
}

export default DeleteMany;