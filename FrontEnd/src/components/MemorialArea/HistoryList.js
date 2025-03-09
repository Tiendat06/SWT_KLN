import React from "react";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { memorial_history_1,memorial_history_2,memorial_history_3,memorial_history_4  } from "~/assets/img";
import styles from "~/styles/Components/Memorial/HistoryList.module.scss"; 
import clsx from "clsx"; 
import { Link } from "react-router-dom";

const historyItems = [
    {
        id: 1,
        title: "NGÔI NHÀ LƯU NIỆM THỜI NIÊN THIẾU CỦA CHỦ TỊCH TÔN",
        description: "Ngôi nhà lưu niệm thời niên thiếu Chủ Tịch Tôn Đức Thắng được xây dựng vào năm 1887. Nhà được xây theo kiểu nhà sàn Nam bộ ba gian, 2 chái bát dần. Toàn bộ loại gỗ sử dụng trong nhà là gỗ thao lao, riêng bộ cột làm bằng gỗ tràm. Mái lợp ngói đại ống hay còn gọi là ngói âm dương. Tổng diện tích ngôi nhà là 156m2.",
        image: memorial_history_1,
    },
    {
        id: 2,
        title: "ĐỀN TƯỞNG NIỆM THEO KIẾN TRÚC ĐÀI CỔ VIỆT NAM",
        description: "Diện tích tổng thể của ngôi đền 1600m2 riêng phần chính diện 110 m2. Con số 110 ở đây các nhà thiết kế xây dựng muốn đánh dấu sự thành công và lòng tôn kính của mình đối với vị lãnh tụ nhân kỷ niệm ngày sinh của người.",
        image: memorial_history_2,
    },
    {
        id: 3,
        title: "15 NĂM ĐẤU TRANH NƠI NGỤC TÙ CÔN ĐẢO",
        description: "Trưng bày chuyên đề 15 năm tù Côn Đảo” đây là nơi giới thiệu những hình ảnh, tư liệu và hiện vật về quá trình hình thành nhà tù Côn Đảo, phản ánh sinh động, chân thực về địa ngục trần gian mà những chiến sĩ cộng sản ta phải trải qua, đặc biệt là khoảng thời gian 15 năm Bác Tôn bị lưu đày ở địa ngục trần gian Côn Đảo.",
        image: memorial_history_3,
    },
    {
        id: 4,
        title: "KHU MỘ CHÍ CỦA THÂN SINH CHỦ TỊCH TÔN",
        description: "Khu mộ này trước đây được đắp xi măng. Sau có tô thêm phần đá rửa, khi được công nhận là di tích lịch sử văn hóa cấp quốc gia thì khu mộ của gia đình đã được tráng và tô cao thêm phần nền, đồng thời cũng xây đường đi từ khu mộ...",
        image: memorial_history_4,
    },
];

const HistoryList = () => {
    return (
        <div className={clsx(styles.historyList)}>
            {historyItems.map((item) => (
                <Card key={item.id} className={clsx(styles.historyCard)}>
                    <div className={clsx(styles.contentWrapper)}>
                        {/* Ảnh */}
                        <img src={item.image} alt={item.title} className={clsx(styles.historyImage)} />

                        {/* Nội dung */}
                        <div className={clsx(styles.textContent)}>
                            <h3 className={clsx(styles.historyTitle)}>{item.title}</h3>
                            <p className={clsx(styles.historyDescription)}>{item.description}</p>
                            <div className={clsx(styles.historyLink)}>
                            <Link to="/memorial-area" className={clsx(styles.historyLink)}>Xem chi tiết >></Link>                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default HistoryList;
