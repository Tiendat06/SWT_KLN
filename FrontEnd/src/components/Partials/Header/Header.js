import clsx from "clsx";
import {Link} from "react-router-dom";

import styles from "~/styles/Layouts/header.module.scss";
import {tdtu_logo, search_icon, user_icon, vn_icon} from "~/assets/img";
import {siteJRoutes,} from "~/routes/appRoutes";
import {useEffect, useState} from "react";
import {getBlogListService} from "~/services/BlogService";
import MediaType from "~/enum/MediaType/MediaType";
import {MemorialTDTLink, PresidentTDTLink} from "~/features/Site";

function Header() {
    const [blogId, setBlogId] = useState(null);
    useEffect(() => {
        const getBlogById = async () => {
            const data = await getBlogListService(1, 1, MediaType.TDTHandiwork);
            setBlogId(data?.data?.items[0]?.blogId);
        }
        getBlogById();
    }, []);

    return (
        <>
            <header className={clsx(styles["header-top"])}>
                <div className={clsx(styles["header-top__logo"])}>
                    <img className={clsx(styles['header-top__logo-img'])} src={`${tdtu_logo}`} alt=""/>
                    <p className={clsx(styles['header-top__logo-para'])}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</p>
                </div>
                <div className={clsx(styles['header-top__right'])}>
                    <img className={clsx(styles['header-top__right-icon-search'])} src={`${search_icon}`} alt=""/>
                    <div className={styles['header-top__right-login']}>
                        <img className={clsx(styles['header-top__right-login-icon'])} src={`${user_icon}`} alt=""/>
                        <p className={clsx(styles['header-top__right-login-para'])}>Đăng nhập</p>
                    </div>
                    <img className={clsx(styles['header-top__right-icon-vn'])} src={`${vn_icon}`} alt=""/>
                </div>
            </header>
            <header className={clsx(styles['header-bottom'])}>
                <div className={clsx(styles["header-bottom__title"])}>
                    <p className={clsx(styles['header-bottom__title-kln'])}>KHU LƯU NIỆM</p>
                    <p className={clsx(styles['header-bottom__title-tdt'])}>CHỦ TỊCH TÔN ĐỨC THẮNG</p>
                </div>
                <ul className={clsx(styles['header-bottom__navigate-list'])}>
                    <div style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                    }} className="position-relative">
                        <Link to={siteJRoutes[0].path} className={clsx(styles['header-bottom__navigate-item'], 'position-relative')}>
                            <p className={clsx(styles['header-bottom__navigate-item__para'], 'link-underline')}>TRANG CHỦ</p>
                        </Link>
                    </div>
                    <PresidentTDTLink />
                    <MemorialTDTLink />
                    <div style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                    }} className="position-relative">
                        <Link to={`/handiwork/${blogId}`} className={clsx(styles['header-bottom__navigate-item'], 'position-relative')}>
                            <p className={clsx(styles['header-bottom__navigate-item__para'], 'link-underline')}>CÔNG TRÌNH MANG TÊN BÁC TÔN</p>
                        </Link>
                    </div>
                </ul>
            </header>
        </>
    )
}

export default Header;