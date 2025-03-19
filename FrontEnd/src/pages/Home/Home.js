import styles from '~/styles/Pages/Site/site.module.scss';
import {home_img_1, home_img_2, home_img_3} from '~/assets/img';
import clsx from "clsx";
import {KLNSlideBanner} from "~/components";
import {BooksList, NewsList} from '~/features/Site';
import { Editor } from '@tinymce/tinymce-react';

function Home() {
    return (
        <>
            <KLNSlideBanner/>
            <div className={clsx(styles['home-info'])}>
                <div className={clsx(styles['home-info__title'])}>
                    <p className={clsx(styles['home-info__title-1'])}>THÔNG TIN</p>
                    <p className={clsx(styles['home-info__title-2'])}>KHU LƯU NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG</p>
                </div>
                <div className={clsx(styles['home-info__content'])}>
                    <div className={clsx(styles['home-info__content-img-list'], 'col-lg-6 col-md-6 col-sm-12')}>
                        <div className={clsx('col-lg-7 col-md-7 col-sm-7 d-flex justify-content-end')}>
                            <img className={clsx(styles['home-info__content-img--item'])}
                                 src={`${home_img_1}`} alt=""/>
                        </div>
                        <div
                            className={clsx(styles["home-info__content-img--sub"], 'col-lg-5 col-md-5 col-sm-5')}>
                            <img
                                className={clsx('col-lg-12 col-md-12 col-sm-12', styles["home-info__content-img--sub-item"])}
                                src={`${home_img_2}`} alt=""/>
                            <img
                                className={clsx('col-lg-12 col-md-12 col-sm-12', styles["home-info__content-img--sub-item"])}
                                src={`${home_img_3}`} alt=""/>
                        </div>
                    </div>
                    <div className={clsx(styles['home-info__content-text'], 'col-lg-6 col-md-6 col-sm-12')}>
                        <p className={clsx(styles['home-info__content-text-title'])}>Khu lưu niệm Chủ tịch Tôn
                            Đức Thắng</p>
                        <p className={clsx(styles['home-info__content-text-para'])}>
                            Khu lưu niệm Chủ tịch Tôn Đức Thắng phát triển bởi Tổ Phần mềm trực thuộc Đại học
                            Tôn Đức Thắng là một nền tảng trực tuyến giới thiệu về cuộc đời, sự nghiệp và những
                            đóng góp vĩ đại của Chủ tịch Tôn Đức Thắng cho sự nghiệp cách mạng và phát triển của
                            Việt Nam. Trang web cung cấp thông tin chi tiết về các hiện vật, tài liệu lịch sử và
                            các hoạt động giáo dục nhằm tôn vinh và phát huy di sản của người.
                        </p>
                    </div>
                </div>
            </div>
            <div className={clsx(styles["home-outstanding"], 'col-lg-12 col-md-12 col-sm-12')}>
                <NewsList />
                <BooksList />
            </div>
        </>
    )
}

export default Home;