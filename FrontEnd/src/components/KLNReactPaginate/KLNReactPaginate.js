import ReactPaginate from "react-paginate";
import clsx from "clsx";
import styles from '~/styles/Components/KLNReactPaginate/klnReactPaginate.module.scss';
import {memo} from "react";
import {BsThreeDots} from "react-icons/bs";

function KLNReactPaginate({ handlePageClick, pageCount }) {
    return (
        <ReactPaginate
            breakLabel={<BsThreeDots className={clsx(styles['break-icon'])} size={18} />}
            breakLinkClassName={'break-link'}
            breakClassName={clsx(styles["break-me"])}
            nextLabel="&raquo;"
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="&laquo;"
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-end"}
            pageClassName={"page-item"}
            pageLinkClassName={clsx(styles['page-link'], 'page-link')}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            marginPagesDisplayed={2}
            nextLinkClassName={clsx(styles['next-link'], 'page-link')}
            previousLinkClassName={clsx(styles['prev-link'], 'page-link')}
            activeClassName={clsx(styles["active"])}
            disabledClassName={''}
        />
    );
}

export default memo(KLNReactPaginate);
