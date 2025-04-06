import {KLNAudio} from "~/components";
import {clsx} from "clsx";
import styles from '~/styles/Pages/B2C/About/aboutMusic.module.scss';
import {useAboutAudioContext} from "~/context/B2C/About/AboutAudioContext";
import {useLayoutEffect,} from "react";
import {getMusicByIdService} from "~/services/MusicService";

function MainAudio() {
    const {
        audio,
        setAudio,
        audioId
    } = useAboutAudioContext();

    useLayoutEffect(() => {
        const getAudio = async () => {
            const data = await getMusicByIdService(audioId);
            setAudio(data?.data);
        }
        getAudio();
    }, []);
    return (
        <>
            <div className={clsx(styles["about-music__main"], 'col-lg-8 col-md-7 col-sm-12')}>
                <KLNAudio
                    imageLink={audio?.imageLink}
                    title={audio?.musicTitle}
                    author={audio?.musicAuthor}
                    src={audio?.audioLink}
                />
            </div>
        </>
    )
}

export default MainAudio;