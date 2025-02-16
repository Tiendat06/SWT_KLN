import clsx from "clsx";
import { FaPlayCircle } from "react-icons/fa"; // Import icon Play từ React Icons
import styles from "~/styles/Pages/About/aboutMultimediaDocuments.module.scss";
import { gallery_video_1, gallery_video_2, gallery_video_3, gallery_video_4, gallery_video_5, gallery_video_6, gallery_video_7, gallery_video_8 } from "~/assets/img";

const videos = [
  { src: gallery_video_1, title: "Video về Bác" },
  { src: gallery_video_2, title: "Video về Bác" },
  { src: gallery_video_3, title: "Video về Bác" },
  { src: gallery_video_4, title: "Video về Bác" },
  { src: gallery_video_5, title: "Video về Bác" },
  { src: gallery_video_6, title: "Video về Bác" },
  { src: gallery_video_7, title: "Video về Bác" },
  { src: gallery_video_8, title: "Video về Bác" },
];

function AboutVideoClipGallery() {
  return (
    <div className={clsx(styles.videogallery)}>
      <div className={clsx(styles.videogallery__header)}>
        <h3 className={clsx(styles.videogallery__title)}>THƯ VIỆN VIDEO CLIP VÀ PHIM</h3>
        <a href="#" className={clsx(styles.videogallery__viewMore)}>Xem thêm</a>
      </div>
      <div className={clsx(styles.videogallery__grid)}>
        {videos.map((video, index) => (
          <div key={index} className={clsx(styles.videogallery__item)}>
            <div className={clsx(styles.videogallery__videoWrapper)}>
              <img src={video.src} alt={video.title} className={clsx(styles.videogallery__image)} />
              <FaPlayCircle className={clsx(styles.videogallery__playIcon)} />
            </div>
            <p className={clsx(styles.videogallery__caption)}>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutVideoClipGallery;
