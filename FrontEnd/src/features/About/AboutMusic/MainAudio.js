import {CustomAudio} from "~/components";
import {clsx} from "clsx";
import styles from '~/styles/Pages/About/aboutMusic.module.scss';
import {useAboutAudioContext} from "~/context/About/AboutAudioContext";
import {useLayoutEffect,} from "react";
import {getMusicListService} from "~/services/MusicService";

function MainAudio() {
    const {
        audio,
        setAudio
    } = useAboutAudioContext();

    useLayoutEffect(() => {
        const getAudio = async () => {
            const data = await getMusicListService(1, 1);
            setAudio(data?.data?.items[0]);
        }
        getAudio();
    }, []);
    return (
        <>
            <div className={clsx(styles["about-music__main"], 'col-lg-8 col-md-7 col-sm-12')}>
                <CustomAudio
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