import clsx from "clsx";
import styles from "~/styles/Components/KLNTableAction/klnTableAction.module.scss";
import {memo} from "react";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import PenBrokenIcon from "~/assets/icon/PenBrokenIcon";

const KLNTableActionModal = ({
    onEdit = () => {},
    onClickDelete = () => {},
    deleteBtnClassName = '',
    editBtnClassName = '',
    deleteBtnStyle = {},
    editBtnStyle = {},
    deleteIconClassName = '',
    editIconClassName = '',
    deleteIconStyle = {},
    editIconStyle = {},
    deleteIconWeight = 'normal',
    editIconWeight = 'normal',
}) => {

    return (
        <>
            <div style={deleteBtnStyle} onClick={onClickDelete}
                 className={clsx(styles['action-trash'], deleteBtnClassName)}>
                <TrashBrokenIcon style={{
                    ...deleteIconStyle
                }} fontWeight={deleteIconWeight} className={clsx(styles['icon-trash'], deleteIconClassName)}/>
            </div>
            <div style={editBtnStyle} onClick={onEdit}
                 className={clsx(styles['action-edit'], editBtnClassName)}>
                <PenBrokenIcon style={{
                    ...editIconStyle
                }} fontWeight={editIconWeight} className={clsx(styles['icon-pen'], editIconClassName)}/>
            </div>
        </>
    )
}

export default memo(KLNTableActionModal); 