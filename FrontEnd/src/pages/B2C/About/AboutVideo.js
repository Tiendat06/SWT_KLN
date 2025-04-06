import {clsx} from 'clsx';
import KLNTitle from '~/components/KLNTitle/KLNTitle';
import styles from '~/styles/Pages/B2C/About/aboutVideoFilm.module.scss';
import {VideoClipList, VideoMain} from "src/features/B2C/About";
import {AboutVideoProvider} from "~/context/B2C/About/AboutVideoContext";

const AboutVideo = () => {
    return (
        <AboutVideoProvider>
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