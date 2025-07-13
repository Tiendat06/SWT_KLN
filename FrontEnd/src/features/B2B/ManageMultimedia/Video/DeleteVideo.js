import {KLNModal} from "~/components";
import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import React, {useCallback} from "react";
import {deleteVideoAction} from "~/store/B2B/ManageMultimedia/actions";
import {check_icon} from "~/assets/img";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const DeleteVideo = () => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {video, dispatch, setSelectedItems} = useManageMultimediaContext();

    const onClickDeleteItem = useCallback(() => {
        // api
        dispatch(deleteVideoAction([video]));
        setDeleteAction(false);
        setSelectedItems([]);
    }, [video]);

    return (
        <>
            <KLNModal
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
    );
}

export default DeleteVideo;