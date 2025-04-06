import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutMultimediaDocuments.module.scss";
import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {FormatTime} from "~/utils";
import {useAboutMultimediaDocumentContext} from "~/context/B2C/About/AboutMultimediaDocumentContext";

function AboutMusicGallery() {
    const audioRefs = useRef([]);
    const [duration, setDuration] = useState(0);

    const {
        aboutAudio
    } = useAboutMultimediaDocumentContext();

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
        <div className={clsx(styles["music-library"])}>
            <div className={clsx(styles["music-library__header"])}>
                <h3 className={clsx(styles["music-library__title"])}>THƯ VIỆN NHẠC</h3>
                <Link to={`/about-audio/${aboutAudio[0]?.musicId}`} className={clsx(styles["music-library__view-more"])}>Xem
                    thêm</Link>
            </div>
            <div className={clsx(styles["music-library__list"])}>
                {aboutAudio.map((music, index) => (
                    <Link key={`multimedia-music-${index}`} to={`/about-audio/${music?.musicId}`}
                          className={clsx(styles["music-library"])}>
                        <div
                            className={clsx(styles["music-library__item"], index % 2 === 0 ? styles["music-library__item--alt"] : "")}>
                            <img src={music?.imageLink} alt="Thumbnail"
                                 className={clsx(styles["music-library__thumbnail"])}/>
                            <div className={clsx(styles["music-library__info"])}>
                                <p className={clsx(styles["music-library__song"])}>
                                    {music.musicTitle}
                                    <span style={{marginLeft: 8}}>| {music?.musicAuthor}</span>
                                </p>
                                <span
                                    className={clsx(styles["music-library__duration"])}>{FormatTime(duration[index])}</span>
                                <audio
                                    ref={(el) => (audioRefs.current[index] = el)}
                                    src={music?.audioLink}
                                    onLoadedMetadata={() => handleLoadedMetadata(index)}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AboutMusicGallery;
