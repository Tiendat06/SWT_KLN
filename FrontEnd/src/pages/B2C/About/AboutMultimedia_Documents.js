import {PictureGallery, VideoClipGallery, MusicGallery, MultimediaCategory} from 'src/features/B2C/About';
import styles from '~/styles/Pages/B2C/About/aboutMultimediaDocuments.module.scss';
import clsx from 'clsx';
import {KLNTitle} from "~/components";
import {AboutMultimediaDocumentProvider} from "~/context/About/AboutMultimediaDocumentContext";

const AboutMultimediaDocuments = () => {
    return (
        <AboutMultimediaDocumentProvider>
            <div className={clsx(styles["aboutMultimedia"])}>
                <KLNTitle>
                    TÀI LIỆU ĐA PHƯƠNG TIỆN
                </KLNTitle>
                <div className={clsx(styles["aboutMultimediaposition"])}>
                    <MultimediaCategory />
                    <PictureGallery/>
                    <VideoClipGallery/>
                    <MusicGallery/>
                </div>
            </div>
        </AboutMultimediaDocumentProvider>
    );
}

export default AboutMultimediaDocuments;