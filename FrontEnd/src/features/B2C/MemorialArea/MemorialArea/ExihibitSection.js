import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2C/Memorial/ExhibitSection.module.scss";
import {getSlideShowListService,} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

const ExhibitSection = () => {
    const [slideShowList, setSlideShowList] = useState([]);

    useEffect(() => {
        const getExhibit = async () => {
            const exhibitionHouseData = await getSlideShowListService(1, 1, MediaType.TDTMemorial, SlideShowType.ExhibitionHouse);
            const artifactData = await getSlideShowListService(1, 1, MediaType.TDTMemorial, SlideShowType.Artifact);
            const artifacts = artifactData?.data?.items[0];
            const exhibitionHouses = exhibitionHouseData?.data?.items[0];
            artifacts.urlLink = '/memorial-artifact';
            exhibitionHouses.urlLink = '/memorial-exhibition';
            setSlideShowList([exhibitionHouses, artifacts]);
        }
        getExhibit();
    }, []);

    return (
        <div className={clsx(styles["exhibit-container"])}>
            {slideShowList?.map((item) => (
                <Card key={item?.slideShowId} className={clsx(styles["exhibit-card"])}>
                    <div className={clsx(styles["exhibit-content"])}>

                        {/* Header (Tiêu đề + Xem thêm) */}
                        <div className={clsx(styles["exhibit-header"])}>
                            <h3 className={clsx(styles["exhibit-title"])}>{item?.title}</h3>
                            <Link to={`${item.urlLink}/${item.slideShowId}`} className={clsx(styles["exhibit-link"])}>Xem thêm</Link>
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
                                    }} src={exhibit?.imageLink} alt="Hình ảnh" />
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
