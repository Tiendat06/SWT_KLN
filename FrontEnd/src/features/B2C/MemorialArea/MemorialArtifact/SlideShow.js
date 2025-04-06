import clsx from "clsx";
import styles from "~/styles/Pages/B2C/Memorial/memorialArtifacts.module.scss";
import SlideImage from "~/components/KLNSlideImage/KLNSlideImage";
import {useMemorialArtifactContext} from "~/context/B2C/MemorialArea/MemorialArtifactContext";
import { useEffect } from "react";
import {getSlideShowByIdService} from "~/services/SlideShowService";

function SlideShow(){
    const {slideShowId,
        slideImageList,
        setSlideImageList,
        slideImageMain,
        setSlideImageMain} = useMemorialArtifactContext();

    useEffect(() => {
        const getSlideShowById = async () => {
            const data = await getSlideShowByIdService(slideShowId);
            const slideShow = data?.data;
            const slideImages = slideShow?.slideImage;
            setSlideImageList(slideImages);
            setSlideImageMain(slideImages[0]);
        }
        getSlideShowById();
    }, []);

    return (
        <>
            <div className={clsx(styles["memorial-artifact__content"])}>
                <div className={clsx(styles["memorial-artifact__content--inner"])}>
                    <div className={clsx(styles["memorial-artifact__main"])}>
                        <div className={clsx(styles["memorial-artifact__img"])}>
                            <img style={{width: "100%", height: "100%"}} src={slideImageMain?.imageLink} alt="Ảnh nghệ thuật"/>
                            <div className={clsx(styles["memorial-artifact__overlay"])}>
                                <p>
                                    {slideImageMain?.capture}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles["memorial-artifact__slide-image"])}>
                        <SlideImage
                            slideImageList={slideImageList}
                            setChoosingImage={setSlideImageMain}
                            choosingImage={slideImageMain}
                            numVisible={5}
                            numScroll={1}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SlideShow;