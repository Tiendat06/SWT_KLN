import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutMultimediaDocuments.module.scss";
import { songThumbnail } from '~/assets/img';

const songs = [
  { title: "An Giang quê tôi", artist: "Phạm Nguyễn", duration: "03:14" },
  { title: "An Giang quê tôi", artist: "Phạm Nguyễn", duration: "03:14" },
  { title: "An Giang quê tôi", artist: "Phạm Nguyễn", duration: "03:14" },
  { title: "An Giang quê tôi", artist: "Phạm Nguyễn", duration: "03:14" },
  { title: "An Giang quê tôi", artist: "Phạm Nguyễn", duration: "03:14" },
];

function AboutMusicGallery() {
  return (
    <div className={clsx(styles["music-library"])}>
      <div className={clsx(styles["music-library__header"])}>
        <h3 className={clsx(styles["music-library__title"])}>THƯ VIỆN NHẠC</h3>
        <a href="#" className={clsx(styles["music-library__view-more"])}>Xem thêm</a>
      </div>
      <div className={clsx(styles["music-library__list"])}>
        {songs.map((song, index) => (
          <div className={clsx(styles["music-library"])}>
            <div key={index} className={clsx(styles["music-library__item"], index % 2 === 0 ? styles["music-library__item--alt"] : "")}>
              <img src={songThumbnail} alt="Thumbnail" className={clsx(styles["music-library__thumbnail"])} />
              <div className={clsx(styles["music-library__info"])}>
                <p className={clsx(styles["music-library__song"])}>{song.title} <span>| {song.artist}</span></p>
                <span className={clsx(styles["music-library__duration"])}>{song.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutMusicGallery;
