import {KLNModal} from "~/components";
import React, {memo} from "react";
// import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";

const DeleteMany = ({
                        isLoading,
                        visible, setVisible,
                        btnSaveOnClick = () => {
                        },
                        btnCancelOnClick = () => {
                        }
                    }) => {
    // const {visible, setVisible} = useManageMultimediaContext();
    return (
        <>
            <KLNModal
                isLoading={isLoading}
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
                btnSaveOnClick={btnSaveOnClick}
                btnCancelOnClick={btnCancelOnClick}
            >
                <p style={{
                    fontWeight: "bold",
                    fontSize: 21,
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa không ?</p>
            </KLNModal>
        </>
    );
}

export default memo(DeleteMany);