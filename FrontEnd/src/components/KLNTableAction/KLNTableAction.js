import clsx from "clsx";
import styles from "~/styles/Pages/B2B/MediaDocument/manageImage.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
// import {useAdminContext} from "~/context/AdminContext";
import {Link} from "react-router-dom";

const KLNTableAction = ({
                            actionLink = '',
                            onClickDelete = () => {}
                        }) => {

    return (
        <>
            <div onClick={onClickDelete} className={clsx(styles['action-trash'])}>
                <FontAwesomeIcon icon={faTrash}/>
            </div>
            <div className={clsx(styles['action-edit'])}>
                <Link to={actionLink}>
                    <FontAwesomeIcon icon={faPencil}/>
                </Link>
            </div>
        </>
    )
}

export default KLNTableAction;