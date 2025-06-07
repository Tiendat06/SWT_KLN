import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutTopic.module.scss";
import SlideImage from "~/components/KLNSlideImage/KLNSlideImage";
import {useAboutTopicContext} from "~/context/B2C/About/AboutTopicContext";
import {useEffect} from "react";
import {topicService} from "~/services/TopicService";
import {Button} from "primereact/button";
import TopicType from "~/enum/Topic/TopicType";

function SlideShowTopic() {
    const {
        slideImageList,
        setSlideImageList,
        slideImageMain,
        setSlideImageMain,
        topicId, topicType, setTopicType,
        isLoading
    } = useAboutTopicContext();

    useEffect(() => {
        const getTopic = async () => {
            const data = await topicService.getTopicByIdService(topicId);
            let topic;
            if (topicType === TopicType.ImageType)
                topic = data?.data?.images
            else if (topicType === TopicType.VideoType)
                topic = data?.data?.videos;
            setSlideImageList(topic);
            setSlideImageMain(topic[0]);
        }
        getTopic();
    }, [topicId, isLoading]);

    return (
        <>
            <div className={clsx(styles["about-art__content"])}>
                <div className={clsx(styles["buttons"])}>
                    <Button onClick={() => setTopicType(() => TopicType.ImageType)}
                            className={clsx(styles["buttons-custom-button"],
                                (topicType === TopicType.ImageType && styles["active"]))}>Ảnh</Button>
                    <Button onClick={() => setTopicType(() => TopicType.VideoType)}
                            className={clsx(styles["buttons-custom-button"],
                                (topicType === TopicType.VideoType && styles["active"]))}>Video</Button>
                </div>
                <div className={clsx(styles["about-art__content--inner"])}>
                    <div className={clsx(styles["about-art__main"])}>
                        <div className={clsx(styles["about-art__img"])}>
                            {topicType === TopicType.ImageType && (
                                <>
                                    <img style={{width: "100%", height: "100%"}} src={slideImageMain?.imageLink}
                                         alt="Ảnh nghệ thuật"/>
                                    <div className={clsx(styles["about-art__overlay"])}>
                                        <p>
                                            {slideImageMain?.capture}
                                        </p>
                                    </div>
                                </>
                            )}
                            {topicType === TopicType.VideoType && (
                                <iframe src={slideImageMain?.videoLink}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            )}
                        </div>
                    </div>
                    <div className={clsx(styles["about-art__slide-image"])}>
                        <SlideImage
                            slideImageList={slideImageList}
                            setChoosingImage={setSlideImageMain}
                            choosingImage={slideImageMain}
                            numVisible={4}
                            numScroll={1}
                            isImage={topicType === TopicType.ImageType}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SlideShowTopic;