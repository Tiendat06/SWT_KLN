import styles from '~/styles/Pages/About/aboutArt.module.scss';
import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";
import {about_art_main} from '~/assets/img';
import SlideImage from "~/components/SlideImage/SlideImage";
import {AboutArtProvider, useAboutArtContext} from "~/context/About/AboutArtContext";
import {SlideShow} from "~/features/About";

function AboutArt(){

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