import styles from '~/styles/Pages/B2C/About/aboutArt.module.scss';
import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";
import {AboutArtProvider} from "~/context/B2C/About/AboutArtContext";
import {SlideShow} from "src/features/B2C/About";
import {Helmet} from "react-helmet-async";
import {PRESIDENT_TDT_TITLE} from "~/utils/Constansts";

const AboutArt = () => {

    return (
        <AboutArtProvider>
            <Helmet>
                <title>{PRESIDENT_TDT_TITLE}</title>
            </Helmet>
            <div className={clsx(styles["about-art"])}>
                <KLNTitle>
                    HÌNH ẢNH NGHỆ THUẬT VỀ CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>
                <SlideShow />
            </div>
        </AboutArtProvider>
    );
}

export default AboutArt;