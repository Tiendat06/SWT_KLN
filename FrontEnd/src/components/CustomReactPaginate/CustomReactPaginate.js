import ReactPaginate from "react-paginate";
import clsx from "clsx";
import styles from '~/styles/Components/CustomReactPaginate/customReactPaginate.module.scss';

function CustomReactPaginate({ handlePageClick, pageCount }) {
    return (
        <ReactPaginate
            breakLabel="..."
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
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            nextLinkClassName={clsx(styles['next-link'], 'page-link')}
            previousLinkClassName={clsx(styles['prev-link'], 'page-link')}
            activeClassName={clsx(styles["active"])}
            disabledClassName={''}
        />
    );
}

export default CustomReactPaginate;
