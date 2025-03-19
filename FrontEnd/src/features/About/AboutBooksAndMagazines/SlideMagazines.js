import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutSidebarBooks.module.scss";
import {useCallback, useEffect, useState} from "react";
import { book_img } from '~/assets/img';
import {getMagazineByIdService, getMagazineListService} from "~/services/MagazineService";
import {useAboutBooksMagazinesContext} from "~/context/About/AboutBooksMagazinesContext";
import {KLNReactDotPaginate} from "~/components";
import {useNavigate} from "react-router-dom";

function SlidebarMagazines() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [magazineList, setMagazineList] = useState([]);
    const ITEMS_PER_PAGE = 7;
    const navigate = useNavigate();

    const {selectedMagazine, setSelectedMagazine, setSelectedBook, itemId} = useAboutBooksMagazinesContext();
    useEffect(() => {
        const getListMagazine = async () => {
            const data = await getMagazineListService(ITEMS_PER_PAGE, currentPage);
            const defaultData = await getMagazineByIdService(itemId);
            if (defaultData?.data !== null){
                setSelectedBook(null);
                setSelectedMagazine(defaultData?.data);
            }
            setMagazineList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
        }
        getListMagazine();
    }, [currentPage]);

    const onClickMagazine = (magazine) => {
        setSelectedMagazine(magazine);
        setSelectedBook(null);
        navigate(`/about-books-magazines/${magazine?.magazineId}`)
    }

    const onClickCurrentPage = useCallback((index) => {
        setCurrentPage(index + 1)
    }, []);

    return (
        <div className={clsx(styles.ListOfBooks)}>
            <div className={clsx(styles.ListOfBooks__sidebar)}>
                <h3 className={clsx(styles.ListOfBooks__title)}>Danh sách tạp chí</h3>
                <ul className={clsx(styles.ListOfBooks__list)}>
                    {magazineList.map((magazine) => (
                        <li
                            key={`magazine-sidebar-${magazine?.magazineId}`}
                            className={clsx(styles.ListOfBooks__listItem,
                                {
                                [styles["ListOfBooks__listItem--active"]]: selectedMagazine?.magazineId === magazine?.magazineId,
                            }
                            )}
                            onClick={() => onClickMagazine(magazine)}
                        >
                            {magazine?.title}
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

export default SlidebarMagazines;