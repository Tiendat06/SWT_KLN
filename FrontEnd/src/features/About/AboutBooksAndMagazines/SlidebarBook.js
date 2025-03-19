import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import {useCallback, useEffect, useState} from "react";
import {getBookByIdService, getBookListService} from "~/services/BookService";
import {useAboutBooksMagazinesContext} from "~/context/About/AboutBooksMagazinesContext";
import {KLNReactDotPaginate} from "~/components";
import {useNavigate} from "react-router-dom";

function SidebarBook() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 7;

    const {selectedBook, setSelectedBook, setSelectedMagazine, itemId} = useAboutBooksMagazinesContext();

    useEffect(() => {
        const getBookList = async () => {
            const data = await getBookListService(ITEMS_PER_PAGE, currentPage);
            const defaultData = await getBookByIdService(itemId);
            if (defaultData?.data !== null) {
                setSelectedBook(defaultData?.data);
                setSelectedMagazine(null);
            }
            setBookList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
        }
        getBookList();
    }, [currentPage]);

    const onClickBook = (book) => {
        setSelectedBook(book);
        setSelectedMagazine(null);
        navigate(`/about-books-magazines/${book?.bookId}`)
    }

    const onClickCurrentPage = useCallback((index) => {
        setCurrentPage(index + 1)
    }, []);

    return (
        <div className={clsx(styles.ListOfBooks)}>
            <div className={clsx(styles.ListOfBooks__sidebar)}>
                <h3 className={clsx(styles.ListOfBooks__title)}>Danh sách đầu sách</h3>
                <ul className={clsx(styles.ListOfBooks__list)}>
                    {bookList?.map((book) => (
                        <li
                            key={book?.bookId}
                            className={clsx(styles.ListOfBooks__listItem,
                                {
                                [styles["ListOfBooks__listItem--active"]]: selectedBook?.bookId === book?.bookId,
                            }
                            )}
                            onClick={() => onClickBook(book)}
                        >
                            {book?.title}
                        </li>
                    ))}
                </ul>
                <KLNReactDotPaginate
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onClick={onClickCurrentPage}
                />
            </div>
        </div>
    );
}

export default SidebarBook;