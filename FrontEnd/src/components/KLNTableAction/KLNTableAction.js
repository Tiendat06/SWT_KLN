import clsx from "clsx";
import styles from "~/styles/Pages/B2B/MediaDocument/manageImage.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {memo} from "react";

const KLNTableAction = ({
                            editActionLink = '',
                            onClickDelete = () => {}
                        }) => {

    return (
        <>
            <div onClick={onClickDelete} className={clsx(styles['action-trash'])}>
                <FontAwesomeIcon icon={faTrash}/>
            </div>
            <div className={clsx(styles['action-edit'])}>
                <Link to={editActionLink}>
                    <FontAwesomeIcon icon={faPencil}/>
                </Link>
            </div>
        </>
    )
}

export default memo(KLNTableAction);