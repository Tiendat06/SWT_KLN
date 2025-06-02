import clsx from "clsx";
import {FaPlayCircle} from "react-icons/fa";
import styles from "~/styles/Pages/B2C/About/aboutMultimediaDocuments.module.scss";
import {Link} from "react-router-dom";
import {useAboutMultimediaDocumentContext} from "~/context/B2C/About/AboutMultimediaDocumentContext";

function AboutVideoClipGallery() {
    const {
        aboutVideo
    } = useAboutMultimediaDocumentContext();

    return (
        <div className={clsx(styles.videogallery)}>
            <div className={clsx(styles.videogallery__header)}>
                <h3 className={clsx(styles.videogallery__title)}>THƯ VIỆN VIDEO CLIP VÀ PHIM</h3>
                <Link to={`/about-film/${aboutVideo[0]?.videoId}`} className={clsx(styles.videogallery__viewMore)}>Xem thêm</Link>
            </div>
            <div className={clsx(styles.videogallery__grid)}>
                {aboutVideo?.map((video, index) => (
                    <Link to={`/about-film/${video?.videoId}`} key={`multimedia-video-${index}`} className={clsx(styles.videogallery__item)}>
                        <div className={clsx(styles.videogallery__videoWrapper)}>
                            <img src={video?.videoImageLink} alt={video?.videoTitle} className={clsx(styles.videogallery__image)}/>
                            <FaPlayCircle className={clsx(styles.videogallery__playIcon)}/>
                        </div>
                        <p className={clsx(styles.videogallery__caption)}>{video?.videoTitle}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AboutVideoClipGallery;
