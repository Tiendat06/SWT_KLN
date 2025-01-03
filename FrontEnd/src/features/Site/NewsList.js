import clsx from "clsx";
import styles from '~/styles/Site/site.module.scss';
import {plus_icon_1, blog_home_1, sentence_home_1} from "~/assets/img";
import {siteRoutes} from '~/routes/appRoutes';
import {Link} from "react-router-dom";

function NewsList() {
    return (
        <>
            <div className={clsx(styles['home-news'], 'col-lg-7 col-md-7 col-sm-12')}>
                <div className={clsx(styles['home-news__title'])}>
                    <p className={clsx(styles['home-news__title-text'])}>BẢN TIN</p>
                    <img className={clsx(styles['home-news__img'])} src={`${plus_icon_1}`} alt=""/>
                </div>
                <div className={clsx(styles["home-news__blog"])}>
                    <Link to={siteRoutes[0].path} className={clsx(styles["home-news__blog-content"])}>
                        <img src={`${blog_home_1}`} className={clsx(styles['home-news__blog-img'])} alt=""/>
                        <p className={clsx(styles['home-news__blog-para'])}>
                            <Link to={siteRoutes[0].path}>BÁC TÔN HIỆN THÂN CỦA ĐOÀN KẾT DÂN TỘC</Link>
                        </p>
                    </Link>
                    <div className={clsx(styles["home-news__blog-list"])}>
                        <Link to={siteRoutes[0].path} className={clsx(styles['home-news__blog-item'])}>
                            TÔN ĐỨC THẮNG MỘT ĐỜI LIÊM KHIẾT, MỘT ĐỜI GIẢN DỊ
                        </Link>
                        <Link to={siteRoutes[0].path} className={clsx(styles['home-news__blog-item'])}>
                            NHÂN CÁCH MỘT CON NGƯỜI
                        </Link>
                        <Link to={siteRoutes[0].path} className={clsx(styles['home-news__blog-item'])}>
                            MỘT NGƯỜI BÌNH THƯỜNG VÀ VĨ ĐẠI
                        </Link>
                    </div>
                </div>
                <div className={clsx(styles['home-news__sentence'])}>
                    <img src={`${sentence_home_1}`} alt=""/>
                </div>
            </div>
        </>
    )
}

export default NewsList;