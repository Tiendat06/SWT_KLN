import clsx from "clsx";
import styles from "~/styles/Layouts/header.module.scss";
import {KLNDropdown} from "~/components";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {topicService} from "~/services/TopicService";

const PresidentTDTLink = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [presidentTDTDropdownItems, setPresidentTDTDropdownItems] = useState([]);

    useEffect(() => {
        const GetHandiwork = async () => {
            const data = await topicService.getTopicListService(1, 1);
            let handiwork = data?.data?.items[0];
            setPresidentTDTDropdownItems([
                {id: 1, text: 'GIẢ PHẢ', href: '/blog/fd1ac605-2eed-465d-a969-ee0b9f28429f'},
                {id: 2, text: 'CUỘC ĐỜI VÀ SỰ NGHIỆP', href: '/blog/1d538767-7df7-40fe-9e1e-3983b2e8fdd9'},
                {id: 3, text: 'TÁC PHẨM MANG TÊN BÁC', href: '/about-creature'},
                {id: 4, text: 'CHUYÊN ĐỀ HAY VỀ BÁC', href: `/about-topic/${handiwork?.topicId}`},
            ]);
        }
        GetHandiwork();
    }, []);

    return (
        <div style={{
            paddingLeft: 15,
            paddingRight: 15,
        }} className="position-relative">
            <Link to={'/about'}
                  onMouseMove={() => setDropdownVisible(true)}
                  onMouseLeave={() => setDropdownVisible(false)}
                  className={clsx(styles['header-bottom__navigate-item'], 'position-relative')}>
                <p className={clsx(styles['header-bottom__navigate-item__para'], 'link-underline')}>CHỦ TỊCH TÔN ĐỨC
                    THẮNG</p>
            </Link>
            {isDropdownVisible &&
                <KLNDropdown
                    itemList={presidentTDTDropdownItems}
                    setDropdownVisible={setDropdownVisible}
                />
            }
        </div>
    )
}

export default PresidentTDTLink;