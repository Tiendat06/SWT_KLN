import clsx from "clsx";
import styles from '~/styles/Pages/B2C/About/aboutCreature.module.scss';
import {bookService} from "~/services/BookService";
import {KLNButton, KLNReactPaginate} from "~/components";
import {play_icon_1} from "~/assets/img";
import {useCallback, useLayoutEffect, useState} from "react";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

function CreatureList() {
    const itemsPerPage = 3;
    const [bookList, setBookList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useLayoutEffect(() => {
        const GetBookList = async () => {
            const bookData = await bookService.getBookListService(itemsPerPage, currentPage);
            setBookList(bookData?.data?.items);
            setPageCount(Math.ceil(bookData?.data?.totalCount / itemsPerPage));
        }
        GetBookList();
    }, [currentPage]);

    const handlePageClick = useCallback(async (event) => {
        setCurrentPage(event.selected + 1)
    }, []);

    return (
        <>
            <div className={clsx(styles["about-creature__outstanding"])}>
                <h1 className={clsx(styles['about-creature__outstanding-title'])}>TÁC PHẨM NỔI BẬT</h1>
                <ul className={clsx(styles["about-creature__outstanding-list"])}>
                    {bookList?.map((creature, index) => (
                        <li key={`creature-list-${creature?.bookId}`} className={clsx(styles["about-creature__outstanding-item"])}>
                            <div className={clsx(styles["about-creature__outstanding-item--inner"])}>
                                <div
                                    className={clsx(styles["about-creature__outstanding-item-img"], 'col-lg-2 col-md-2 col-sm-2')}>
                                    <img src={creature?.image} alt=""/>
                                </div>
                                <div
                                    className={clsx(styles["about-creature__outstanding-item-content"], 'col-lg-10 col-md-10 col-sm-10')}>
                                    <h3 title={creature?.title} className={clsx('col-lg-12 col-md-12 col-sm-12')}>{creature?.title}</h3>
                                    <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-1')}>Author: {creature?.author}</p>
                                    <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-1')}>Publisher: {creature?.publisher}</p>
                                    <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-1')}>Year Public: {creature?.yearPublic} {/*DateTimeFormat(creature?.yearPublic)*/}</p>
                                    <div className={clsx(styles["about-creature__outstanding-btn"])}>
                                        <KLNButton
                                            urlLink={`/about-books-magazines/${creature?.bookId}`}
                                            options={KLNButtonEnum.warningBtn}
                                                   btnClassName={clsx(styles['about-creature__outstanding-btn-item'])}>
                                            <img style={{width: 20, height: 20, marginRight: 5}} src={play_icon_1}
                                                 alt=""/>
                                            Xem thêm
                                        </KLNButton>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={clsx(styles["about-creature__outstanding-paginate"])}>
                    <div style={{width: "90%"}} className="">
                        <KLNReactPaginate
                            handlePageClick={handlePageClick}
                            pageCount={pageCount}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatureList;