import {clsx} from 'clsx';
import { Player } from 'video-react';
import KLNTitle from '~/components/KLNTitle/KLNTitle';
import styles from '~/styles/Pages/About/aboutVideoFilm.module.scss';
import {VideoClipList} from "~/features/About";

function AboutVideo(){
    return (
        <>
            <div className={clsx(styles["about-video"])}>
                <KLNTitle>
                    VIDEO CLIP & PHIM
                </KLNTitle>
                <div className={clsx(styles["about-video__content"])}>
                    <div className={clsx(styles["about-video__content--inner"])}>
                        <iframe style={{display: "block", width: "100%", height: 700}} 
                            src="https://www.youtube.com/embed/ieno0teXxyI?si=HprDQ0erwLfjZWBj"
                            title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <p className={clsx('col-lg-12 col-md-12 col-sm-12 mb-0')}>Bác Tôn hiện thân của đoàn kết dân tộc</p>
                    </div>
                </div>
                <VideoClipList />

            </div>
        </>
    )
}

export default AboutVideo;