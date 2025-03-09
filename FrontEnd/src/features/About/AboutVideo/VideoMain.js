import {clsx} from "clsx";
import styles from "~/styles/Pages/About/aboutVideoFilm.module.scss";
import {useAboutVideoContext} from "~/context/About/AboutVideoContext";
import {useLayoutEffect} from "react";
import {getVideoListService} from "~/services/AboutService";

const VideoMain = () => {
    const {
        video,
        setVideo,
    } = useAboutVideoContext()

    useLayoutEffect(() => {
        const getVideo = async () => {
            const data = await getVideoListService(1, 1);
            setVideo(data?.data?.items[0]);
        }
        getVideo();
    }, []);
    return (
        <div className={clsx(styles["about-video__content"])}>
            <div className={clsx(styles["about-video__content--inner"])}>
                <iframe src={video?.videoLink}
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-0')}>{video?.videoTitle}</p>
            </div>
        </div>
    );
}

export default VideoMain;