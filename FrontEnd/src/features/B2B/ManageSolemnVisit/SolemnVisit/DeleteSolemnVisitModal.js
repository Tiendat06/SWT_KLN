import { KLNModal } from "~/components";
import React, { useCallback } from "react";
import { useManageSolemnVisitContext } from "~/context/B2B/ManageSolemnVisit/ManageSolemnVisitContext";
import { showToast } from "~/utils/Toast";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import { useAppContext } from "~/context/AppContext";

const DeleteSolemnVisitModal = ({ visible, setVisible, btnSaveOnClick, btnCancelOnClick, onDelete }) => {
    const { selectedSolemnVisits } = useManageSolemnVisitContext();
    const { toast } = useAppContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let solemnVisitIds = [];
            if (selectedSolemnVisits && selectedSolemnVisits.length > 0) {
                solemnVisitIds = selectedSolemnVisits.map(visit => visit.solemnVisitId || visit);
            }
            if (solemnVisitIds.length > 0 && onDelete) {
                await onDelete(solemnVisitIds);
            }
        } catch (error) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa lãnh đạo viếng thăm', detail: 'Có lỗi xảy ra khi xóa lãnh đạo viếng thăm' });
            setVisible(false);
        }
    }, [selectedSolemnVisits, onDelete, setVisible]);

    const getDeleteMessage = () => {
        if (selectedSolemnVisits && selectedSolemnVisits.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedSolemnVisits.length} lãnh đạo viếng thăm đã chọn không ?`;
        } else if (selectedSolemnVisits && selectedSolemnVisits.length === 1) {
            return `Bạn có chắc chắn muốn xóa lãnh đạo viếng thăm '${selectedSolemnVisits[0]?.solemnVisitName || ''}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <>
            <KLNModal
                visible={visible}
                setVisible={setVisible}
                position={'middle'}
                labelSave='Xác nhận'
                labelCancel='Bỏ qua'
                headerStyle={{
                    padding: "5px 10px 0 10px"
                }}
                contentStyle={{
                    paddingBottom: 10
                }}
                btnSaveOnClick={btnSaveOnClick || onClickDeleteItem}
                btnCancelOnClick={btnCancelOnClick || (() => setVisible(false))}
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
                <p style={{
                    fontWeight: "bold",
                    fontSize: 21,
                }} className="text-center mb-0 text-dark">
                    {getDeleteMessage()}
                </p>
            </KLNModal>
        </>
    );
};

export default DeleteSolemnVisitModal;


