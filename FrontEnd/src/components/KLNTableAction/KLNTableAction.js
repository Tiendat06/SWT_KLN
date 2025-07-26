import clsx from "clsx";
import styles from "~/styles/Components/KLNTableAction/klnTableAction.module.scss";
import {memo} from "react";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import PenBrokenIcon from "~/assets/icon/PenBrokenIcon";

const KLNTableAction = ({
                            editActionLink = '',
                            onClickDelete = () => {
                            },
                            onClickEdit = () => {
                            },
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
            <div style={editBtnStyle} onClick={onClickEdit} className={clsx(styles['action-edit'], editBtnClassName)}>
                <a href={editActionLink}>
                    <PenBrokenIcon style={{
                        ...editIconStyle
                    }} fontWeight={editIconWeight} className={clsx(styles['icon-pen'], editIconClassName)}/>
                </a>
            </div>
        </>
    )
}

export default memo(KLNTableAction);