import {CustomCategory, SlideImage} from "~/components";
import clsx from "clsx";
import styles from "~/styles/Pages/Memorial/memorialExhibition.module.scss";
import {useAboutArtContext} from "~/context/About/AboutArtContext";
import {useEffect} from "react";
import {banner_1} from "~/assets/img";
import {getSlideShowByIdService} from "~/services/AboutService";

const ExhibitionCategory = () => {
    const {slideShowId,
        slideImageList,
        setSlideImageList,
        slideImageMain,
        setSlideImageMain,
        slideShow,
        setSlideShow
    } = useAboutArtContext();

    useEffect(() => {
        const getSlideShowById = async () => {
            const data = await getSlideShowByIdService(slideShowId);
            const slideShowData = data?.data;
            const slideImageData = data?.data?.slideImage;
            setSlideShow(slideShowData);
            setSlideImageList(slideImageData);
            setSlideImageMain(slideImageData[0].imageLink);
        }
        getSlideShowById();
    }, []);
    return (
        <>
            <CustomCategory
                title="Danh sách mục trưng bày"
            >
                <div className={clsx(styles["memorial-exhibition__content"])}>
                    <div className={clsx(styles["memorial-exhibition__content--inner"])}>
                        <div className={clsx(styles["memorial-exhibition__main"])}>
                            <div className={clsx(styles["memorial-exhibition__img"])}>
                                <img style={{width: "100%", height: "100%"}} src={slideImageMain} alt="Ảnh nghệ thuật"/>
                                <div className={clsx(styles["memorial-exhibition__overlay"])}>
                                    <p>
                                        Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles["memorial-exhibition__slide-image"])}>
                            <SlideImage
                                slideImageList={slideImageList}
                                setChoosingImage={setSlideImageMain}
                                choosingImage={slideImageMain}
                            />
                        </div>
                    </div>
                </div>
            </CustomCategory>
        </>
    )
}

export default ExhibitionCategory;