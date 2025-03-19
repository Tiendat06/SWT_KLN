import React, {useRef, useState, useEffect} from "react";
import { Play, Pause } from "lucide-react";
import {clsx} from "clsx";
import {
    about_art_main,
    next_icon_2,
    previous_icon_2,
    mute_volume_icon,
    increase_volume_icon
} from '~/assets/img';
import styles from '~/styles/Components/KLNAudio/klnVideo.module.scss';
import {FormatTime} from "~/utils";

function KLNAudio({src,
                         imageLink=about_art_main,
                         title = 'An Giang quê tôi',
                         author = 'Phạm Nguyên'
}) {

    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        const updateTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const changeProgress = (e) => {
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const changeVolume = (newVolume) => {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const skipTime = (seconds) => {
        audioRef.current.currentTime += seconds;
        setCurrentTime(audioRef.current.currentTime);
    };

    return (
        <div className={clsx("d-flex flex-wrap", styles["custom-audio"])}>
            <audio ref={audioRef} src={src} />
            <div className={clsx(styles["custom-audio__img"], 'mb-3')}>
                <img style={{width: "50%", height: 300, objectFit: "cover"}} className={clsx(styles["custom-audio__img--inner"])} src={imageLink} alt=""/>
                <p className={clsx('col-lg-12 col-sm-12 col-md-12 mb-0 text-center')}>{title}</p>
                <p style={{fontSize: 14}} className={clsx('col-lg-12 col-sm-12 col-md-12 mb-0 text-center')}>{author}</p>
            </div>

            <div className={clsx(styles["custom-audio__progress"], 'col-lg-12 col-sm-12 col-md-12')}>
                {/* Time Display */}
                <div className={clsx(styles["custom-audio__progress-time"])}>
                    <span>{FormatTime(currentTime)}</span>
                    <span>{FormatTime(duration)}</span>
                </div>

                {/* Progress Bar */}
                <input
                    ref={progressRef}
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={changeProgress}
                    style={{height: 5}}
                    className={clsx(styles["custom-audio__progress-bar"], "w-full my-2")}
                />
            </div>

            <div className={clsx(styles["custom-audio__btn"], "col-lg-12 col-sm-12 col-md-12")}>
                <div className="d-flex justify-content-between align-items-center" style={{width: "30%"}}>
                    {/* Skip Back 10s */}
                    <img style={{height: 20, cursor: "pointer"}} onClick={() => skipTime(-10)} src={previous_icon_2} alt=""/>
                    {/* Play/Pause KLNButton */}
                    <button onClick={togglePlay} className={styles["custom-audio__btn--play"]}>
                        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>

                    {/* Skip Forward 10s */}
                    <img style={{height: 20, cursor: "pointer"}} onClick={() => skipTime(10)} src={next_icon_2} alt=""/>
                </div>
            </div>

            {/* Volume Control */}
            <div className={clsx("col-lg-12 col-md-12 col-md-12 mt-3", styles["custom-audio__volume"])}>
                {/*<button onClick={() => changeVolume(0)} className="text-white">*/}
                {/*    <VolumeX size={20} />*/}
                {/*</button>*/}
                <div className="d-flex justify-content-between align-items-center" style={{width: "60%"}}>
                    <img style={{marginRight: 10, cursor: "pointer"}} onClick={() => changeVolume(0)} src={mute_volume_icon} alt=""/>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={e => changeVolume(e.target.value)}
                        className={clsx(styles["custom-audio__volume--bar"])}
                        style={{height: 5, width: "100%"}}
                    />
                    <img style={{marginLeft: 10, cursor: "pointer"}} onClick={() => changeVolume(1)} src={increase_volume_icon} alt=""/>
                </div>
                {/*<button onClick={() => changeVolume(1)} className="text-white">*/}
                {/*    <Volume2 size={20} />*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default KLNAudio;