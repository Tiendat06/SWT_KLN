import React from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Components/Memorial/ExhibitSection.module.scss";
import { memorial_exhibitselection_1, memorial_exhibitselection_2 } from "~/assets/img";

const exhibitItems = [
    { id: 1, image: "link_hinh_1.jpg", description: "JFJFJFFJ" },
    { id: 2, image: "link_hinh_2.jpg", description: "JFJFJFFJ" },
    { id: 3, image: "link_hinh_3.jpg", description: "JFJFJFFJ" },
];

const exhibits = [
    {
        id: 1,
        title: "Nhà Trưng Bày",
        image: memorial_exhibitselection_1,
        description: "Thời niên thiếu Bác Tôn",
    },
    {
        id: 2,
        title: "Hiện Vật & Hình Ảnh",
        image: memorial_exhibitselection_2,
        description: "Xe đạp DYNHO: Bác Tôn mua tại Cửa hàng mậu dịch Tràng Thi năm 1957.",
    },
];

const ExhibitSection = () => {
    return (
        <div className={clsx(styles["exhibit-container"])}>
            {exhibits.map((item) => (
                <Card key={item.id} className={clsx(styles["exhibit-card"])}>
                    <div className={clsx(styles["exhibit-content"])}>

                        {/* Header (Tiêu đề + Xem thêm) */}
                        <div className={clsx(styles["exhibit-header"])}>
                            <h3 className={clsx(styles["exhibit-title"])}>{item.title}</h3>
                            <Link to="/exhibit-detail" className={clsx(styles["exhibit-link"])}>Xem thêm</Link>
                        </div>

                        {/* Ảnh chính */}
                        <img src={item.image} alt={item.title} className={clsx(styles["exhibit-image"])} />
                        <p className={clsx(styles["exhibit-description"])}>{item.description}</p>

                        {/* Danh sách hình ảnh hiện vật */}
                        <div className={clsx(styles["exhibit-list"])}>
                            {exhibitItems.map((exhibit) => (
                                <div key={exhibit.id} className={clsx(styles["exhibit-item"])}>
                                    <img src={exhibit.image} alt="hiện vật" />
                                    <p>{exhibit.description}</p>
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
