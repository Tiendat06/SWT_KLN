import {clsx} from "clsx";
import {Carousel} from "primereact/carousel";
import {Link} from "react-router-dom";
import {next_icon_1, previous_icon_1} from "~/assets/img";
import styles from '~/styles/Components/KLNVideoClip/klnVideoClip.module.scss';

function KLNVideoClip({
                       videoClipList,
                       choosingVideo,
                       setChoosingVideo,
                       numVisible = 4,
                       numScroll = 1
                   }) {

    const responsiveOptions = [
        {breakpoint: '1024px', numVisible: 5, numScroll: 1},
        {breakpoint: '768px', numVisible: 4, numScroll: 1},
        {breakpoint: '560px', numVisible: 1, numScroll: 1},
    ];

    const onCLickVideo = (video) => {
        setChoosingVideo(video);
    }

    const videoListTemplate = videoClip => {
        let isSelected = choosingVideo?.videoLink === videoClip?.videoLink;

        return (
            <>
                <Link onClick={() => onCLickVideo(videoClip)}
                      to={`/about-film/${videoClip?.videoId}`} style={{width: '100%', height: 100}}
                      className='d-flex justify-content-center'>
                    <div
                        style={{
                            border: isSelected ? "2px solid red" : "none",
                        }}
                        className={clsx(styles["video-clip"])}>
                        <img style={{width: "100%"}} src={videoClip?.videoImageLink}
                             className={clsx(styles["video-clip__img"])} alt="Ảnh nghệ thuật"/>
                        <div className={clsx(styles["video-clip__overlay"])}>
                            <p>{videoClip?.videoTitle}</p>
                        </div>
                    </div>
                </Link>
            </>
        )
    };

    return (
        <>
            <Carousel value={videoClipList}
                      numVisible={numVisible}
                      numScroll={numScroll}
                      responsiveOptions={responsiveOptions}
                      className="custom-carousel"
                      circular={true}
                      autoplayInterval={3000}
                      showNavigators={true}
                      showIndicators={true}
                      nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                      prevIcon={<img src={`${previous_icon_1}`} alt="Previous"
                                     style={{width: "30px", height: "30px"}}/>}
                      itemTemplate={videoListTemplate}/>
        </>
    )
}

export default KLNVideoClip;