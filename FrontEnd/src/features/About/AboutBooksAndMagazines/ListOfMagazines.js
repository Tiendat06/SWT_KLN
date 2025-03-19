import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import {KLNPDFViewer} from "~/components";
import {useAboutBooksMagazinesContext} from "~/context/About/AboutBooksMagazinesContext";

function ListOfMagazines() {
    const {selectedMagazine} = useAboutBooksMagazinesContext();
    return (
        <div className={clsx(styles.ListOfBooks)}>
            <div className={clsx(styles.BookContent)}>
                {selectedMagazine && (
                    <>
                        <h2 className={clsx(styles.BookContent__title)}>
                            {selectedMagazine?.title}
                        </h2>
                        <div className={clsx(styles.BookContent__info)}>
                            <img
                                src={selectedMagazine?.image}
                                alt={selectedMagazine?.title}
                                className={clsx(styles.BookContent__image)}
                            />
                            <p className={clsx(styles.BookContent__desc)}>
                                {selectedMagazine?.description}
                            </p>
                        </div>
                        <KLNPDFViewer
                            url={selectedMagazine?.magazineContent}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default ListOfMagazines;