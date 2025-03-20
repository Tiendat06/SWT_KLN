import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";
import { SlideShowTopic, SidebarTopic } from "~/features/About";
import styles from "~/styles/Pages/About/aboutTopic.module.scss";
import {AboutTopicProvider} from "~/context/About/AboutTopicContext";

const AboutTopic = () => {

    return (
        <AboutTopicProvider>
            <div style={{
                marginTop: 30
            }}>
                <KLNTitle>
                    CHUYÊN ĐỀ HAY VỀ CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>

                <div className={clsx(styles["aboutTopic"])}>
                    <div className={clsx(styles["aboutTopic-sidebar"], 'col-lg-3 col-md-3 col-sm-12')}>
                        <SidebarTopic />
                    </div>
                    <div className={clsx(styles["aboutTopic-slideshow"], 'col-lg-9 col-md-9 col-sm-12')}>
                        <SlideShowTopic />
                    </div>
                </div>
            </div>
        </AboutTopicProvider>
    );
}

export default AboutTopic;