import clsx from "clsx";
import styles from "~/styles/Pages/Site/site.module.scss";
import {plus_icon_1,} from "~/assets/img";
import {siteJRoutes} from '~/routes/appRoutes';
import {Link} from "react-router-dom";
import {magazineService} from "~/services/MagazineService";
import {useEffect, useState} from "react";

function BooksList() {

    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        const GetMagazineList = async () => {
            const data = await magazineService.getMagazineListService(3, 1);
            setBookList(data?.data?.items);
        }
        GetMagazineList();
    }, []);

    return (
        <>
            <div className={clsx(styles['home-book'], 'col-lg-5 col-md-5 col-sm-12')}>
                <div className={clsx(styles['home-book__title'])}>
                    <p className={clsx(styles['home-book__title-text'])}>TÁC PHẨM NỔI BẬT</p>
                    <img className={clsx(styles['home-book__title-img'])} src={`${plus_icon_1}`} alt=""/>
                </div>
                {bookList?.map((magazine, index) => (
                    <Link key={`magazine-home-${magazine.magazineId}`} to={siteJRoutes[0].path} className={clsx(styles["home-book__item"])}>
                        <div className={clsx(styles["home-book__img"])}>
                            <img className={clsx(styles['home-book__img-item'])} src={magazine.image} alt=""/>
                            <div className={clsx(styles['home-book__img-sub'])}>
                                <img className={clsx(styles['home-book__img-sub-item'])} src={magazine.image} alt=""/>
                                <p className={clsx(styles['home-book__img-sub-para'])}>{magazine.title}</p>
                            </div>
                        </div>
                        <div className={clsx(styles['home-book__text'])}>
                            <p className={clsx(styles['home-book__text-para'])}>{magazine.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default BooksList;