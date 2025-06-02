import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss";
import {KLNPDFViewer} from "~/components";
import {useAboutBooksMagazinesContext} from "~/context/B2C/About/AboutBooksMagazinesContext";

function ListOfBooks() {
    // const [selectedBook, setSelectedBook] = useState(bookList[0]);
    const {selectedBook} = useAboutBooksMagazinesContext();

    return (
        <div className={clsx(styles.ListOfBooks)}>
            <div className={clsx(styles.BookContent)}>
                {selectedBook && (
                    <>
                        <h2 className={clsx(styles.BookContent__title)}>
                            {selectedBook?.title} - {selectedBook?.author}
                        </h2>
                        <div className={clsx(styles.BookContent__info)}>
                            <img
                                src={selectedBook?.image}
                                alt={selectedBook?.title}
                                className={clsx(styles.BookContent__image)}
                            />
                            <p className={clsx(styles.BookContent__desc)}>
                                {selectedBook?.description}
                            </p>
                        </div>
                        <KLNPDFViewer
                            url={selectedBook?.bookContent}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default ListOfBooks;