import clsx from "clsx";
import { FaPlayCircle } from "react-icons/fa"; // Import icon Play từ React Icons
import styles from "~/styles/Pages/About/aboutMultimediaDocuments.module.scss";
import { video1, video2, video3, video4, video5, video6, video7, video8 } from "~/assets/img";

const videos = [
  { src: video1, title: "Video về Bác" },
  { src: video2, title: "Video về Bác" },
  { src: video3, title: "Video về Bác" },
  { src: video4, title: "Video về Bác" },
  { src: video5, title: "Video về Bác" },
  { src: video6, title: "Video về Bác" },
  { src: video7, title: "Video về Bác" },
  { src: video8, title: "Video về Bác" },
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
