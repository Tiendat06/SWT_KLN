import {clsx} from "clsx";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import { next_icon_1, previous_icon_1 } from "~/assets/img";
import styles from '~/styles/Components/VideoClip/videoClip.module.scss';
import {about_art_main} from '~/assets/img';

function VideoClip({videoClipList}) {

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 5, numScroll: 1 },
        { breakpoint: '768px', numVisible: 4, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ]

    const videoListTemplate = videoClip => {
        return (
            <>
                <Link to="/" style={{width:'100%'}} className='d-flex justify-content-center'>
                    <div className={clsx(styles["video-clip"])}>
                        <img style={{width: "100%"}} src={about_art_main} className={clsx(styles["video-clip__img"])} alt="Ảnh nghệ thuật" />
                        <div className={clsx(styles["video-clip__overlay"])}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ex exercitationem fugit id in ipsum magnam maxime modi neque obcaecati perspiciatis quae quaerat, quidem reiciendis rerum velit, voluptatem! Nulla, reiciendis.</p>
                        </div>
                    </div>
                </Link>
            </>
        )
    };

    return (
        <>
            <Carousel value={videoClipList}
                        numVisible={4}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        className="custom-carousel"
                        circular={true}
                        autoplayInterval={3000}
                        showNavigators={false}
                        showIndicators={true}
                        nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                        prevIcon={<img src={`${previous_icon_1}`} alt="Previous" style={{width: "30px", height: "30px"}}/>}
                        itemTemplate={videoListTemplate}/>
        </>
    )
}

export default VideoClip;