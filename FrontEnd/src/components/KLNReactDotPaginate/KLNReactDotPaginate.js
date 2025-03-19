import clsx from "clsx";
import styles from "~/styles/Components/KLNReactDotPaginate/klnReactDotPaginate.module.scss";
import {memo} from "react";

const KLNReactDotPaginate = ({currentPage, pageCount, onClickCurrentPage}) => {

    return (
        <div className={clsx(styles["react-dot-paginate"])}>
            {Array.from({length: pageCount}).map((_, index) => (
                <span
                    key={`list-of-book-sidebar-${index}`}
                    className={clsx(styles["dot"], {
                        [styles["dotActive"]]: currentPage === index + 1,
                    })}
                    onClick={() => index + 1 !== currentPage && onClickCurrentPage(index + 1)}
                ></span>
            ))}
        </div>
    )
}

export default memo(KLNReactDotPaginate);