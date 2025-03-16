// import { useState } from 'react';
import {PictureGallery, VideoClipGallery, MusicGallery} from '~/features/About';
import {anh, nhac, videoclip, phim} from '~/assets/img';
import styles from '~/styles/Pages/About/aboutMultimediaDocuments.module.scss';
import clsx from 'clsx';

const multimediaData = [
    {title: "Ảnh", imgSrc: anh},
    {title: "Nhạc", imgSrc: nhac},
    {title: "Video Clip", imgSrc: videoclip},
    {title: "Phim", imgSrc: phim},
];

function AboutMultimediaDocuments() {
    return (
        <div className={clsx(styles["aboutMultimedia"])}>
            <div className={clsx(styles["aboutMultimedia-title"])}>
                <h3 className={clsx(styles["aboutMultimedia-title__text"])}>
                    TÀI LIỆU ĐA PHƯƠNG TIỆN
                </h3>
            </div>
            <div className={clsx(styles["aboutMultimediaposition"])}>

                <div className={clsx(styles["multimedia-grid"])}>
                    {multimediaData.map((item, index) => (
                        <div key={index} className={clsx(styles["multimedia-card"])}>
                            <img
                                src={item.imgSrc}
                                alt={item.title}
                                className={clsx(styles["card-image"])}
                            />
                            <p className={clsx(styles["card-title"])}>{item.title}</p>
                        </div>
                    ))}
                </div>
                <PictureGallery/>
                <VideoClipGallery/>
                <MusicGallery/>
            </div>
        </div>
    );
}

export default AboutMultimediaDocuments;