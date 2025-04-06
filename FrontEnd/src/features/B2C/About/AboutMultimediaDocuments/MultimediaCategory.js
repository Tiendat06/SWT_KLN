import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutMultimediaDocuments.module.scss";
import {anh, nhac, phim, videoclip} from "~/assets/img";
import {Link} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import {getSlideShowListService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {useAboutMultimediaDocumentContext} from "~/context/B2C/About/AboutMultimediaDocumentContext";
import {getVideoListService} from "~/services/VideoService";
import {getMusicListService} from "~/services/MusicService";

const MultimediaCategory = () => {
    const [multimedia, setMultimedia] = useState([]);
    const {
        setSlideShowAboutArt,
        setAboutVideo,
        setAboutAudio
    } = useAboutMultimediaDocumentContext();

    useLayoutEffect(() => {
        const getSlideShowList = async () => {
            const artData = await getSlideShowListService(1, 1, MediaType.PresidentTDT, SlideShowType.TDTArtistic);
            const videoData = await getVideoListService(4, 1, MediaType.PresidentTDT);
            const musicData = await getMusicListService(4, 1, MediaType.PresidentTDT);
            const slideShowId = artData?.data?.items[0].slideShowId;
            const videoId = videoData?.data?.items[0]?.videoId;
            const musicId = musicData?.data?.items[0]?.musicId;

            setSlideShowAboutArt(artData?.data?.items[0]);
            setAboutVideo(videoData?.data?.items);
            setAboutAudio(musicData?.data?.items);

            const multimediaData = [
                {title: "Ảnh", imgSrc: anh, urlLink: `/about-art/${slideShowId}`},
                {title: "Nhạc", imgSrc: nhac, urlLink: `/about-audio/${musicId}`},
                {title: "Video Clip", imgSrc: videoclip, urlLink: `/about-film/${videoId}`},
                {title: "Phim", imgSrc: phim, urlLink: `/about-film/${videoId}`},
            ];
            setMultimedia(multimediaData);
        }
        getSlideShowList();
    }, []);

    return (
        <>
            <div className={clsx(styles["multimedia-grid"])}>
                {multimedia.map((item, index) => (
                    <Link to={item.urlLink} key={`multimedia-category-${index}`} className={clsx(styles["multimedia-card"])}>
                        <img
                            src={item.imgSrc}
                            alt={item.title}
                            className={clsx(styles["card-image"])}
                        />
                        <p className={clsx(styles["card-title"])}>{item.title}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default MultimediaCategory;