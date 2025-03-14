import React, {useEffect, useState} from "react";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { memorial_history_1,memorial_history_2,memorial_history_3,memorial_history_4  } from "~/assets/img";
import styles from "~/styles/Components/Memorial/HistoryList.module.scss"; 
import clsx from "clsx"; 
import { Link } from "react-router-dom";
import {getBlogListService} from "~/services/MemorialService";
import MediaType from "~/enum/MediaType/MediaType";

const HistoryList = () => {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        const getBlogList = async () => {
            const data = await getBlogListService(4, 1, MediaType.KLNTDT);
            setCardList(data?.data?.items);
        }
        getBlogList();
    }, []);

    return (
        <div className={clsx(styles.historyList)}>
            {cardList.map((item) => (
                <Card key={item.blogId} className={clsx(styles.historyCard)}>
                    <div className={clsx(styles.contentWrapper)}>
                        {/* Ảnh */}
                        <img src={item.blogImage} alt={item.blogTitle} className={clsx(styles.historyImage)} />

                        {/* Nội dung */}
                        <div className={clsx(styles.textContent)}>
                            <h3 className={clsx(styles.historyTitle)}>{item.blogTitle}</h3>
                            <p className={clsx(styles.historyDescription)}>{item.description}</p>
                            <div className={clsx(styles.historyLink)}>
                            <Link to={`/blog/${item.blogId}`} className={clsx(styles.historyLink)}>Xem chi tiết >></Link>                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default HistoryList;
