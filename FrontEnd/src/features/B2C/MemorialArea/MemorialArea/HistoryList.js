import React, {useCallback, useEffect, useState} from "react";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "~/styles/Pages/B2C/Memorial/HistoryList.module.scss";
import clsx from "clsx"; 
import { Link } from "react-router-dom";
import {blogService} from "~/services/BlogService";
import MediaType from "~/enum/MediaType/MediaType";
import {KLNReactPaginate} from "~/components";

const HistoryList = () => {
    const [cardList, setCardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const getBlogList = async () => {
            const data = await blogService.getBlogListService(itemsPerPage, currentPage, MediaType.TDTMemorial);
            setCardList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / itemsPerPage));
        }
        getBlogList();
    }, [itemsPerPage, currentPage]);

    const handlePageClick = useCallback(async (event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    return (
        <div className={clsx(styles.historyList)}>
            {cardList?.map((item) => (
                <Card key={`history-list-memorial-${item?.blogId}`} className={clsx(styles.historyCard)}>
                    <div className={clsx(styles.contentWrapper)}>
                        {/* Ảnh */}
                        <img src={item?.blogImage} alt={item?.blogTitle} className={clsx(styles.historyImage)} />

                        {/* Nội dung */}
                        <div className={clsx(styles.textContent)}>
                            <h3 className={clsx(styles.historyTitle)}>{item?.blogTitle}</h3>
                            <p className={clsx(styles.historyDescription)}>{item?.description}</p>
                            <div className={clsx(styles.historyLink)}>
                            <Link to={`/blog/${item?.blogId}`} className={clsx(styles.historyLink)}>Xem chi tiết >></Link>                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            <KLNReactPaginate
                handlePageClick={handlePageClick}
                pageCount={pageCount}
            />
        </div>
    );
};

export default HistoryList;
