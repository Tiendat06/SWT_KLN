import clsx from "clsx";
import styles from '~/styles/Pages/B2C/About/aboutMusic.module.scss';
import {KLNTitle} from "~/components";
import {AudioList, MainAudio} from "src/features/B2C/About";
import {AboutAudioProvider} from "~/context/B2C/About/AboutAudioContext";
import {Helmet} from "react-helmet-async";
import {PRESIDENT_TDT_TITLE} from "~/utils/Constansts";

const AboutMusic = () => {

    return (
        <AboutAudioProvider>
            <Helmet>
                <title>{PRESIDENT_TDT_TITLE}</title>
            </Helmet>
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