import clsx from "clsx";
import styles from '~/styles/Pages/B2C/About/aboutMusic.module.scss';
import {KLNTitle} from "~/components";
import {AudioList, MainAudio} from "~/features/About";
import {AboutAudioProvider} from "~/context/About/AboutAudioContext";

const AboutMusic = () => {

    return (
        <AboutAudioProvider>
            <div className={clsx(styles["about-music"])}>
                <KLNTitle>
                    NHẠC VỀ BÁC TÔN
                </KLNTitle>
                <div className={clsx(styles["about-music__content"], 'mt-5 mb-5')}>
                    <MainAudio/>
                    <AudioList/>
                </div>
            </div>
        </AboutAudioProvider>
    )
}

export default AboutMusic;