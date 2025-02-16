import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutMultimediaDocuments.module.scss";
import {carousel_image_1, carousel_image_2, carousel_image_3, carousel_image_4} from '~/assets/img';

const images = [
  { src: carousel_image_1, title: "Ảnh về Bác" },
  { src: carousel_image_2, title: "Ảnh về Bác" },
  { src: carousel_image_3, title: "Ảnh về Bác" },
  { src: carousel_image_4, title: "Ảnh về Bác" },
];

function AboutPictureGallery() {
  return (
    <div className={clsx(styles["gallery"])}>
      <div className={clsx(styles["gallery__header"])}>
        <h3 className={clsx(styles["gallery__title"])}>THƯ VIỆN ẢNH</h3>
        <a href="#" className={clsx(styles["gallery__view-more"])}>Xem thêm</a>
      </div>
      <div className={clsx(styles["gallery__grid"])}>
        {images.map((image, index) => (
          <div key={index} className={clsx(styles["gallery__item"])}>
            <img src={image.src} alt={image.title} className={clsx(styles["gallery__image"])} />
            <p className={clsx(styles["gallery__caption"])}>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPictureGallery ;
