import {clsx} from 'clsx';
import KLNTitle from '~/components/KLNTitle/KLNTitle';
import styles from '~/styles/Pages/B2C/About/aboutVideoFilm.module.scss';
import {VideoClipList, VideoMain} from "src/features/B2C/About";
import {AboutVideoProvider} from "~/context/B2C/About/AboutVideoContext";
import {Helmet} from "react-helmet-async";
import {PRESIDENT_TDT_TITLE} from "~/utils/Constansts";

const AboutVideo = () => {
    return (
        <AboutVideoProvider>
            <Helmet>
                <title>{PRESIDENT_TDT_TITLE}</title>
            </Helmet>
            <div className={clsx(styles["about-video"])}>
                <KLNTitle>
                    VIDEO CLIP & PHIM
                </KLNTitle>
                <VideoMain />
                <VideoClipList />
            </div>
        </AboutVideoProvider>
    )
}

export default AboutVideo;