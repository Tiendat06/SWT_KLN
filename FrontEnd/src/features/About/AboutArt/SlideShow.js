import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutArt.module.scss";
import {about_art_main, banner_1} from "~/assets/img";
import SlideImage from "~/components/SlideImage/SlideImage";
import {useAboutArtContext} from "~/context/About/AboutArtContext";
import { useEffect } from "react";

function SlideShow(){
    const {slideImageList, setSlideImageList, slideImageMain, setSlideImageMain} = useAboutArtContext();

    useEffect(() => {
        setSlideImageMain(banner_1);
    }, []);

    return (
        <>
            <div className={clsx(styles["about-art__content"])}>
                <div className={clsx(styles["about-art__content--inner"])}>
                    <div className={clsx(styles["about-art__main"])}>
                        <div className={clsx(styles["about-art__img"])}>
                            <img style={{width: "100%", height: "100%"}} src={slideImageMain} alt="Ảnh nghệ thuật"/>
                            <div className={clsx(styles["about-art__overlay"])}>
                                <p>
                                    Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles["about-art__slide-image"])}>
                        <SlideImage
                            slideImageList={slideImageList}
                            setChoosingImage={setSlideImageMain}
                            choosingImage={slideImageMain}
                        />
                    </div>
                </div>                
            </div>
        </>
    );
}

export default SlideShow;