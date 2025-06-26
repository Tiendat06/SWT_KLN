import {KLNModal} from "~/components";
import React, {memo} from "react";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {check_icon} from "~/assets/img";

const DeleteMany = ({
                        isLoading,
                        visible, setVisible,
                        btnSaveOnClick = () => {
                        },
                        btnCancelOnClick = () => {
                        }
                    }) => {

    return (
        <>
            <KLNModal
                size="sm"
                isLoading={isLoading}
                visible={visible}
                setVisible={setVisible}
                position={'middle'}
                labelSave='Xác nhận'
                labelCancel='Bỏ qua'
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginLeft: 20,
                }}
                headerStyle={{
                    padding: "5px 10px 0 10px"
                }}
                contentStyle={{
                    paddingBottom: 10
                }}
                btnSaveOnClick={btnSaveOnClick}
                btnCancelOnClick={btnCancelOnClick}
                buttonSaveOptions={KLNButtonEnum.blackBtn}
                buttonCloseOptions={KLNButtonEnum.whiteBtn}
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

export default memo(DeleteMany);