import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Components/Memorial/ExhibitSection.module.scss";
import { memorial_exhibitselection_1, memorial_exhibitselection_2 } from "~/assets/img";
import {getSlideShowListService} from "~/services/MemorialService";
import MediaType from "~/enum/MediaType/MediaType";

const ExhibitSection = () => {
    const [slideShowList, setSlideShowList] = useState([]);
    useEffect(() => {
        const getSlideShowList = async () => {
            const data = await getSlideShowListService(2, 1, MediaType.KLNTDT);
            setSlideShowList(data?.data?.items);
        }
        getSlideShowList();
    }, []);

    return (
        <div className={clsx(styles["exhibit-container"])}>
            {slideShowList?.map((item) => (
                <Card key={item?.slideShowId} className={clsx(styles["exhibit-card"])}>
                    <div className={clsx(styles["exhibit-content"])}>

                        {/* Header (Tiêu đề + Xem thêm) */}
                        <div className={clsx(styles["exhibit-header"])}>
                            <h3 className={clsx(styles["exhibit-title"])}>{item?.title}</h3>
                            <Link to={`/memorial-artifact/${item.slideShowId}`} className={clsx(styles["exhibit-link"])}>Xem thêm</Link>
                        </div>

                        {/* Ảnh chính */}
                        <img src={item?.image} alt={item?.title} className={clsx(styles["exhibit-image"])} />
                        <p className={clsx(styles["exhibit-description"])}>{item?.description}</p>

                        {/* Danh sách hình ảnh hiện vật */}
                        <div className={clsx(styles["exhibit-list"])}>
                            {item?.slideImage?.slice(0, 3).map((exhibit) => (
                                <div style={{
                                    paddingBottom: 20
                                }} key={exhibit?.id} className={clsx(styles["exhibit-item"], 'd-flex')}>
                                    <img style={{
                                        width: 153,
                                        height: 93,
                                        objectFit: "cover"
                                    }} src={exhibit?.imageLink} alt="hiện vật" />
                                    <p style={{
                                        marginLeft: 10
                                    }}>{exhibit?.capture}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ExhibitSection;
