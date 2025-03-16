import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutArt.module.scss";
import SlideImage from "~/components/SlideImage/SlideImage";
import {useAboutArtContext} from "~/context/About/AboutArtContext";
import {useLayoutEffect} from "react";
import {getSlideShowByIdService} from "~/services/SlideShowService";

function SlideShow(){
    const {
        slideShowId,
        slideImageList,
        setSlideImageList,
        slideImageMain,
        setSlideImageMain,
        setSlideShow
    } = useAboutArtContext();

    useLayoutEffect(() => {
        const getSlideShowById = async () => {
            try {
                const data = await getSlideShowByIdService(slideShowId);
                const slideShowData = data?.data;
                const slideImageData = data?.data?.slideImage;
                setSlideShow(slideShowData);
                setSlideImageList(slideImageData);
                setSlideImageMain(slideImageData[0]);
            } catch (e){
                console.error(e.message);
            }
        }
        getSlideShowById();
    }, [slideShowId]);

    return (
        <>
            <div className={clsx(styles["about-art__content"])}>
                <div className={clsx(styles["about-art__content--inner"])}>
                    <div className={clsx(styles["about-art__main"])}>
                        <div className={clsx(styles["about-art__img"])}>
                            <img style={{width: "100%", height: "100%"}} src={slideImageMain?.imageLink} alt="Ảnh nghệ thuật"/>
                            <div className={clsx(styles["about-art__overlay"])}>
                                <p>
                                    {slideImageMain?.capture}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles["about-art__slide-image"])}>
                        <SlideImage
                            slideImageList={slideImageList}
                            setChoosingImage={setSlideImageMain}
                            choosingImage={slideImageMain?.imageLink}
                        />
                    </div>
                </div>                
            </div>
        </>
    );
}

export default SlideShow;