import clsx from "clsx";
import styles from '~/styles/Pages/About/aboutMusic.module.scss';
import {Fragment, useLayoutEffect, useRef, useState} from "react";
import {useAboutAudioContext} from "~/context/About/AboutAudioContext";
import {FormatTime} from "~/utils";
import {getMusicListService} from "~/services/MusicService";
import {Link} from "react-router-dom";

function AudioList() {
    const audioRefs = useRef([]);
    const [duration, setDuration] = useState(0);
    const {
        audio,
        setAudio,
        audioList,
        setAudioList
    } = useAboutAudioContext();

    useLayoutEffect(() => {
        const getAudioList = async () => {
            const data = await getMusicListService();
            setAudioList(data?.data?.items);
        }
        getAudioList();
    }, []);

    const handleLoadedMetadata = (index) => {
        const audioElement = audioRefs.current[index];
        if (audioElement) {
            setDuration((prev) => ({
                ...prev,
                [index]: audioElement.duration || 0
            }));
        }
    };

    return (
        <>
            <div className={clsx(styles["about-music__list"], 'col-lg-4 col-md-5 col-sm-12')}>

                <div className={clsx(styles["about-music__title"])}>
                    <h3>DANH SÁCH BÀI HÁT</h3>
                </div>
                <div className={clsx(styles["about-music__category"])}>
                    <div className={clsx(styles["about-music__sub-title"])}>
                        <p className="mb-0">Bài hát tiếp theo</p>
                    </div>
                    <div className={clsx(styles["about-music__song-list"])}>
                        {audioList?.map((item, index) => (
                            <Link to={`/about-audio/${item?.musicId}`} onClick={() => setAudio(item)}
                                  key={`${item?.musicId}-${index}`} className={clsx(styles["about-music__song-item"],
                                ((audio?.musicId === item?.musicId) && styles["about-music__song-item--active"])
                            )}>
                                <div className="col-lg-1 col-md-1 col-md-1">
                                    <i className="fa-solid fa-bars-staggered"></i>
                                </div>
                                <div
                                    className={clsx(styles["about-music__song-item--img"], 'col-lg-2 col-md-2 col-md-2')}>
                                    <img src={item?.imageLink} alt=""/>
                                </div>
                                <div
                                    className={clsx(styles["about-music__song-item--text"], 'col-lg-7 col-md-7 col-md-7')}>
                                    <p>{item?.musicTitle}</p>
                                    <p>{item?.musicAuthor}</p>
                                </div>
                                <div
                                    className={clsx(styles["about-music__song-item--time"], 'col-lg-2 col-md-2 col-md-2')}>
                                    <p>{FormatTime(duration[index])}</p>
                                </div>
                                <audio
                                    ref={(el) => (audioRefs.current[index] = el)}
                                    src={item?.audioLink}
                                    onLoadedMetadata={() => handleLoadedMetadata(index)}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioList;