import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";
import { SlidebarBook } from '~/components';
import { SlideShow, SlideShowTopic } from "~/features/About";
import styles from "~/styles/Pages/About/aboutTopic.module.scss";
import { Button } from 'primereact/button';
import {AboutTopicProvider} from "~/context/About/AboutTopicContext";



function AboutTopic() {

    return (
        <AboutTopicProvider>
            <KLNTitle>
                CHUYÊN ĐỀ HAY VỀ CHỦ TỊCH TÔN ĐỨC THẮNG
            </KLNTitle>
            <div className={clsx(styles["buttons"])}>
                <Button className={clsx(styles["buttons-custom-button"], styles["active"])}>Ảnh</Button>
                <Button className={clsx(styles["buttons-custom-button"])}>Video</Button>
            </div>

            <div className={clsx(styles["aboutTopic"])}>

                <div className={clsx(styles["aboutTopic-sidebar"])}>
                    <SlidebarBook />
                </div>

                <div className={clsx(styles["aboutTopic-slideshow"])}>
                    <SlideShowTopic />
                </div>
            </div>
        </AboutTopicProvider>
    );
}

export default AboutTopic;