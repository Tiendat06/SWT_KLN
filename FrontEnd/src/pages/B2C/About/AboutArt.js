import styles from '~/styles/Pages/B2C/About/aboutArt.module.scss';
import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";
import {AboutArtProvider} from "~/context/About/AboutArtContext";
import {SlideShow} from "src/features/B2C/About";

const AboutArt = () => {

    return (
        <AboutArtProvider>
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