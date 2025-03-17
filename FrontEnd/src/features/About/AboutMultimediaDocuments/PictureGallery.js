import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutMultimediaDocuments.module.scss";
import {Link} from "react-router-dom";
import {useAboutMultimediaDocumentContext} from "~/context/About/AboutMultimediaDocumentContext";

function AboutPictureGallery() {
    const {
        slideShowAboutArt
    } = useAboutMultimediaDocumentContext();

    return (
        <div className={clsx(styles["gallery"])}>
            <div className={clsx(styles["gallery__header"])}>
                <h3 className={clsx(styles["gallery__title"])}>THƯ VIỆN ẢNH</h3>
                <Link to={`/about-art/${slideShowAboutArt?.slideShowId}`} className={clsx(styles["gallery__view-more"])}>Xem thêm</Link>
            </div>
            <div className={clsx(styles["gallery__grid"])}>
                {slideShowAboutArt?.slideImage?.slice(0, 4).map((image, index) => (
                    <Link to={`/about-art/${slideShowAboutArt?.slideShowId}`} key={`slide-about-art-${index}`} className={clsx(styles["gallery__item"])}>
                        <img style={{
                            width: 237,
                            height: 178,
                        }} src={image.imageLink} alt={image.capture} className={clsx(styles["gallery__image"])}/>
                        <p className={clsx(styles["gallery__caption"])}>{image.capture}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AboutPictureGallery;
