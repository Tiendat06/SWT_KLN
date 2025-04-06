import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss";
import {useCallback, useEffect, useState} from "react";
import {getBookListService} from "~/services/BookService";
import {useAboutBooksMagazinesContext} from "~/context/B2C/About/AboutBooksMagazinesContext";
import {KLNReactDotPaginate} from "~/components";
import {useNavigate} from "react-router-dom";

function SidebarBook() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 4;

    const {itemId} = useAboutBooksMagazinesContext();

    useEffect(() => {
        const getBookList = async () => {
            const data = await getBookListService(ITEMS_PER_PAGE, currentPage);
            setBookList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
        }
        getBookList();
    }, [currentPage]);

    const onClickBook = (book) => {
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
                                [styles["ListOfBooks__listItem--active"]]: book?.bookId === itemId,
                            }
                            )}
                            onClick={() => onClickBook(book)}
                            title={book?.title}
                        >
                            <p>{book?.title}</p>
                        </li>
                    ))}
                </ul>
                <KLNReactDotPaginate
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onClickCurrentPage={onClickCurrentPage}
                />
            </div>
        </div>
    );
}

export default SidebarBook;