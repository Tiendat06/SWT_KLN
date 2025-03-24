import clsx from 'clsx';
import styles from '~/styles/Pages/B2C/About/aboutVideoFilm.module.scss';
import KLNVideoClip from "~/components/KLNVideoClip/KLNVideoClip";
import {useLayoutEffect} from "react";
import {getVideoListService} from "~/services/VideoService";
import {useAboutVideoContext} from "~/context/About/AboutVideoContext";

function VideoClipList(){
    const {
        isLoading,
        videoList, setVideoList,
        selectedVideo, setSelectedVideo
    } = useAboutVideoContext();

    useLayoutEffect(() => {
        const getVideoList = async () => {
            const data = await getVideoListService();
            setVideoList(data?.data?.items);
        }
        getVideoList();
    }, [isLoading]);

    return (
        <>
            <div className={clsx(styles['about-video__list'])}>
                <h4 className={clsx(styles["about-video__list-title"], 'mb-0 mt-5 col-lg-12 col-sm-12 col-md-12')}>Danh sách video clip</h4>

                <div className={clsx(styles["about-video__list--inner"])}>
                    <KLNVideoClip
                        videoClipList={videoList}
                        choosingVideo={selectedVideo}
                        setChoosingVideo={setSelectedVideo}
                    />
                </div>
            </div>
        </>
    );
}

export default VideoClipList;