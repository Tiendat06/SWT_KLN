import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss";
import {useCallback, useEffect, useState} from "react";
import {magazineService} from "~/services/MagazineService";
import {useAboutBooksMagazinesContext} from "~/context/B2C/About/AboutBooksMagazinesContext";
import {KLNReactDotPaginate} from "~/components";
import {useNavigate} from "react-router-dom";

function SlidebarMagazines() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [magazineList, setMagazineList] = useState([]);
    const ITEMS_PER_PAGE = 4;
    const navigate = useNavigate();

    const {itemId} = useAboutBooksMagazinesContext();
    useEffect(() => {
        const getListMagazine = async () => {
            const data = await magazineService.getMagazineListService(ITEMS_PER_PAGE, currentPage);
            setMagazineList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
        }
        getListMagazine();
    }, [currentPage]);

    const onClickMagazine = (magazine) => {
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
                                    [styles["ListOfBooks__listItem--active"]]: magazine?.magazineId === itemId,
                                }
                            )}
                            onClick={() => onClickMagazine(magazine)}
                            title={magazine?.title}
                        >
                            <p>{magazine?.title}</p>
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

export default SlidebarMagazines;