import {useCallback, useEffect, useState} from "react";
import {solemnVisitService} from "~/services/SolemnVisitService";
import clsx from "clsx";
import styles from '~/styles/Pages/B2C/Memorial/memorialSolemnVisit.module.scss';
import {KLNReactPaginate, KLNSkeletonWithSpinner} from "~/components";

const SolemnVisitList = () => {
    const [solemnVisitList, setSolemnVisitList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const ITEMS_PER_PAGE = 1;

    useEffect(() => {
        const getSolemnVisitList = async () => {
            setIsLoading(true);
            const data = await solemnVisitService.getSolemnVisitListService(ITEMS_PER_PAGE, currentPage);
            setSolemnVisitList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
            setIsLoading(false);
        }
        getSolemnVisitList();
    }, [currentPage]);

    const handlePageClick = useCallback(async (event) => {
        setCurrentPage(event.selected + 1)
    }, []);

    return (
        <>
            {isLoading ? <KLNSkeletonWithSpinner height="500px" parentHeight="500px" animation="wave"/> :
                <>
                    {solemnVisitList?.map((solemnVisit, index) => (
                        <div style={{
                            height: isLoading ? 750 : null
                        }} key={`solem-visit-${solemnVisit.solemnVisitId}-${index}`}
                             className={clsx(styles['solemn-visit'],
                                 "d-flex flex-wrap justify-content-center mt-5")}>
                            <h1 className={clsx(styles["solemn-visit__title"], "col-lg-12 col-md-12 col-sm-12 text-center mb-0")}>{solemnVisit?.solemnVisitName}</h1>
                            <div
                                className={clsx(styles["solemn-visit__content"], "d-flex flex-wrap justify-content-center")}>
                                <div style={{
                                    width: "90%",
                                    height: "90%",
                                }} className={clsx(styles["solemn-visit__content--inner"],
                                    "d-flex flex-wrap justify-content-center align-items-center col-lg-12 col-md-12 col-sm-12")}>
                                    <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center">
                                        <img
                                            style={{
                                                width: "70%",
                                            }} src={solemnVisit?.portraitImage} alt=""/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 h-100">
                                        <img style={{
                                            width: "100%",
                                            height: "100%"
                                        }} src={solemnVisit?.letterImage} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center mt-5">
                        <KLNReactPaginate
                            handlePageClick={handlePageClick}
                            pageCount={pageCount}
                            forcePage={currentPage - 1}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default SolemnVisitList;