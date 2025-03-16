import clsx from 'clsx';
import styles from '~/styles/Pages/About/aboutVideoFilm.module.scss';
import VideoClip from "~/components/VideoClip/VideoClip";
import {useLayoutEffect} from "react";
import {getVideoListService} from "~/services/VideoService";
import {useAboutVideoContext} from "~/context/About/AboutVideoContext";

function VideoClipList(){
    const {videoList, setVideoList} = useAboutVideoContext();

    useLayoutEffect(() => {
        const getVideoList = async () => {
            const data = await getVideoListService();
            setVideoList(data?.data?.items);
        }
        getVideoList();
    }, []);

    return (
        <>
            <div className={clsx(styles['about-video__list'])}>
                <h4 className={clsx(styles["about-video__list-title"], 'mb-0 mt-5 col-lg-12 col-sm-12 col-md-12')}>Danh sách video clip</h4>

                <div className={clsx(styles["about-video__list--inner"])}>
                    <VideoClip
                        videoClipList={videoList}
                    />
                </div>
            </div>
        </>
    );
}

export default VideoClipList;