import {clsx} from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutVideoFilm.module.scss";
import {useAboutVideoContext} from "~/context/B2C/About/AboutVideoContext";
import {useEffect} from "react";
import {videoService} from "~/services/VideoService";

const VideoMain = () => {
    const {
        isLoading, setIsLoading,
        videoId,
        selectedVideo, setSelectedVideo
    } = useAboutVideoContext();

    useEffect(() => {
        const getDefaultData = async () => {
            const data = await videoService.getVideoByIdService(videoId);
            setSelectedVideo(data?.data);
            setIsLoading(!isLoading);
        }
        getDefaultData();
    }, []);

    return (
        <div className={clsx(styles["about-video__content"])}>
            <div className={clsx(styles["about-video__content--inner"])}>
                <iframe src={selectedVideo?.videoLink}
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-0')}>{selectedVideo?.videoTitle}</p>
            </div>
        </div>
    );
}

export default VideoMain;