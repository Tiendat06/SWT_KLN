import clsx from "clsx";
import styles from '~/styles/Pages/About/aboutMusic.module.scss';
import {about_art_main} from '~/assets/img';
import React, {useEffect, useRef, useState} from "react";
import {useAboutAudioContext} from "~/context/About/AboutAudioContext";
import {FormatTime} from "~/utils";

function AudioList() {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(null);
    const {audioSrc, setAudioSrc} = useAboutAudioContext();

    useEffect(() => {
        setAudioSrc('https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072269/08_buaeek.mp3');
        setDuration(() => audioRef.current.duration);
    }, []);

    return (
        <>
            <div className={clsx(styles["about-music__list"], 'col-lg-4 col-md-5 col-sm-12')}>
                <audio ref={audioRef} src={audioSrc} />

                <div className={clsx(styles["about-music__title"])}>
                    <h3>DANH SÁCH BÀI HÁT</h3>
                </div>
                <div className={clsx(styles["about-music__category"])}>
                    <div className={clsx(styles["about-music__sub-title"])}>
                        <p className="mb-0">Bài hát tiếp theo</p>
                    </div>
                    <div className={clsx(styles["about-music__song-list"])}>
                        <div className={clsx(styles["about-music__song-item"])}>
                            <div className="col-lg-1 col-md-1 col-md-1">
                                <i className="fa-solid fa-bars-staggered"></i>
                            </div>
                            <div className={clsx(styles["about-music__song-item--img"], 'col-lg-2 col-md-2 col-md-2')}>
                                <img src={about_art_main} alt=""/>
                            </div>
                            <div className={clsx(styles["about-music__song-item--text"], 'col-lg-7 col-md-7 col-md-7')}>
                                <p>An Giang quê tôi</p>
                                <p>Phạm Nguyên</p>
                            </div>
                            <div className={clsx(styles["about-music__song-item--time"], 'col-lg-2 col-md-2 col-md-2')}>
                                <p>{FormatTime(duration)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioList;