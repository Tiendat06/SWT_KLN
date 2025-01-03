import clsx from "clsx";
import styles from "~/styles/Site/site.module.scss";
import {plus_icon_1, book_home_1, book_home_2} from "~/assets/img";
import {siteRoutes} from '~/routes/appRoutes';
import {Link} from "react-router-dom";

function BooksList() {
    const bookList = [
        {bookId: '1', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {bookId: '2', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
        {bookId: '3', title: 'Chân dung Bác Tôn của Công ty Thảm len xuất khẩu Sài Gòn.', image: book_home_1, createDate: '', userId: '', bookContent: '', publisher: '', author: '', yearPublic: ''},
    ]

    return (
        <>
            <div className={clsx(styles['home-book'], 'col-lg-5 col-md-5 col-sm-12')}>
                <div className={clsx(styles['home-book__title'])}>
                    <p className={clsx(styles['home-book__title-text'])}>TÁC PHẨM NỔI BẬT</p>
                    <img className={clsx(styles['home-book__title-img'])} src={`${plus_icon_1}`} alt=""/>
                </div>
                {bookList?.map((book, index) => (
                    <Link key={book.bookId} to={siteRoutes[0].path} className={clsx(styles["home-book__item"])}>
                        <div className={clsx(styles["home-book__img"])}>
                            <img className={clsx(styles['home-book__img-item'])} src={book.image} alt=""/>
                            <div className={clsx(styles['home-book__img-sub'])}>
                                <img className={clsx(styles['home-book__img-sub-item'])} src={`${book_home_2}`} alt=""/>
                                <p className={clsx(styles['home-book__img-sub-para'])}>Hình ảnh nghệ thuật về Bác Tôn</p>
                            </div>
                        </div>
                        <div className={clsx(styles['home-book__text'])}>
                            <p className={clsx(styles['home-book__text-para'])}>{book.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default BooksList;