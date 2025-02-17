import clsx from "clsx";
import styles from '~/styles/Pages/Site/site.module.scss';
import {plus_icon_1, blog_home_1, sentence_home_1} from "~/assets/img";
import {siteJRoutes} from '~/routes/appRoutes';
import {Link} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {getBlogListData} from "~/services/SiteService";

function NewsList() {

    const [blogListData, setBlogListData] = useState([]);
    useEffect(() => {
        const GetBlogListData = async () => {
            const data = await getBlogListData();
            setBlogListData(data.data);
        }
        GetBlogListData();
    }, []);

    return (
        <>
            <div className={clsx(styles['home-news'], 'col-lg-7 col-md-7 col-sm-12')}>
                <div className={clsx(styles['home-news__title'])}>
                    <p className={clsx(styles['home-news__title-text'])}>BẢN TIN</p>
                    <img className={clsx(styles['home-news__img'])} src={`${plus_icon_1}`} alt=""/>
                </div>
                <div className={clsx(styles["home-news__blog"])}>
                    {blogListData.map((blog, index) => (
                        <Fragment key={`blog-home-${index}`}>
                            {index === 0 ?
                                (<Link to={siteJRoutes[0].path} className={clsx(styles["home-news__blog-content"])}>
                                    <img src={`${blog.blogImage}`} className={clsx(styles['home-news__blog-img'])} alt=""/>
                                    <p className={clsx(styles['home-news__blog-para'])}>
                                        {blog.blogTitle}
                                    </p>
                                </Link>) :
                                (
                                    <Link to={siteJRoutes[0].path} className={clsx(styles['home-news__blog-item'])}>
                                        {blog.blogTitle}
                                    </Link>
                                )
                            }
                        </Fragment>
                    ))}
                </div>
                <div className={clsx(styles['home-news__sentence'])}>
                    <img src={`${sentence_home_1}`} alt=""/>
                </div>
            </div>
        </>
    )
}

export default NewsList;