import clsx from "clsx";
import styles from '~/styles/Pages/About/about.module.scss';
import {gia_pha_1, tieu_su_1} from '~/assets/img';
import {Button} from '~/components';
import {aboutJRoutes} from '~/routes/appRoutes';
import {TDTMasterpiece, TDTHandiwork} from '~/features/About';
import KLNTitle from "~/components/KLNTitle/KLNTitle";

function About() {
    return (
        <>
            <div className={clsx(styles["about"])}>
                <KLNTitle>
                    CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>
                <div className={clsx(styles["about-genealogy"])}>
                    <div className={clsx(styles["about-genealogy__img"], 'col-lg-3 col-md-3 col-sm-12')}>
                        <img src={`${gia_pha_1}`} alt=""/>
                    </div>
                    <div className={clsx(styles["about-genealogy__info"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <p className={clsx(styles["about-genealogy__info-title"])}>GIA PHẢ</p>
                        <h4 className={clsx(styles['about-genealogy__info-text'])}>GIA PHẢ CHỦ TỊCH TÔN ĐỨC THẮNG</h4>
                        <p className={clsx(styles['about-genealogy__info-para'])}>Tôn Đức Thắng, bí danh Thoại Sơn, sinh ngày 20 tháng 8 năm 1888 tại Cù lao Ông Hổ, làng Mỹ Hoà Hưng, tổng Định Thành, hạt Long Xuyên (nay thuộc xã Mỹ Hòa Hưng, thành phố Long Xuyên, tỉnh An Giang). Là con đầu của ông Tôn Văn Đề (1864–1938), và bà Nguyễn Thị Dị (1867–1947). Gia đình đông con, theo thông lệ miền Nam, ông còn được gọi là Hai Thắng.</p>
                        <Button
                            urlLink={'/blog/fd1ac605-2eed-465d-a969-ee0b9f28429f'}
                            btnClassName={clsx(styles['about-genealogy__info-btn'])}
                        >
                            Xem chi tiết
                        </Button>
                    </div>
                </div>
                <div className={clsx(styles["about-biography"])}>
                    <div className={clsx(styles["about-biography__info"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <p className={clsx(styles["about-biography__info-title"])}>CUỘC ĐỜI VÀ SỰ NGHIỆP</p>
                        <h4 className={clsx(styles['about-biography__info-text'])}>TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ
                            TỊCH TÔN ĐỨC THẮNG</h4>
                        <p className={clsx(styles['about-biography__info-para'])}>Tôn Đức Thắng, bí danh Thoại Sơn, sinh
                            ngày 20 tháng 8 năm 1888 tại Cù lao Ông Hổ, làng Mỹ Hoà Hưng, tổng Định Thành, hạt Long
                            Xuyên (nay thuộc xã Mỹ Hòa Hưng, thành phố Long Xuyên, tỉnh An Giang). Là con đầu của ông
                            Tôn Văn Đề (1864–1938), và bà Nguyễn Thị Dị (1867–1947). Gia đình đông con, theo thông lệ
                            miền Nam, ông còn được gọi là Hai Thắng.
                        </p>
                        <Button
                            urlLink={'/blog/1d538767-7df7-40fe-9e1e-3983b2e8fdd9'}
                            btnClassName={clsx(styles['about-biography__info-btn'])}
                        >
                            Xem chi tiết
                        </Button>
                    </div>
                    <div className={clsx(styles["about-biography__img"], 'col-lg-3 col-md-3 col-sm-12')}>
                        <img src={`${tieu_su_1}`} alt=""/>
                    </div>
                </div>
                <TDTMasterpiece />
                <TDTHandiwork />
            </div>
        </>
    )
}

export default About;