import {clsx} from 'clsx';
import KLNTitle from '~/components/KLNTitle/KLNTitle';
import styles from '~/styles/Pages/About/aboutVideoFilm.module.scss';
import {VideoClipList, VideoMain} from "~/features/About";
import {AboutVideoProvider} from "~/context/About/AboutVideoContext";

function AboutVideo(){
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