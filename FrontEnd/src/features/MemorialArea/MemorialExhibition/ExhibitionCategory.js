import {CustomCategory, SlideImage} from "~/components";
import clsx from "clsx";
import styles from "~/styles/Pages/Memorial/memorialExhibition.module.scss";
import {useEffect, useState} from "react";
import {getSlideShowByIdService, getSlideShowListService} from "~/services/SlideShowService";
import {useMemorialExhibitionContext} from "~/context/MemorialArea/MemorialExhibitionContext";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

const ExhibitionCategory = () => {
    const {slideShowId,
        slideImageList,
        setSlideImageList,
        slideImageMain,
        setSlideImageMain,
        setSlideShow
    } = useMemorialExhibitionContext();

    const [slideShowList, setSlideShowList] = useState([]);

    useEffect(() => {
        const getSlideShowById = async () => {
            const data = await getSlideShowByIdService(slideShowId);
            const slideShowData = data?.data;
            const slideImageData = data?.data?.slideImage;
            setSlideShow(slideShowData);
            setSlideImageList(slideImageData);
            setSlideImageMain(slideImageData[0]);
        }
        getSlideShowById();
    }, []);

    useEffect(() => {
        const getSlideShowList = async () => {
            const data = await getSlideShowListService(0, 1, MediaType.TDTMemorial, SlideShowType.ExhibitionHouse);
            const slideShowListData = data?.data?.items;
            setSlideShowList(slideShowListData);
        }
        getSlideShowList();
    }, []);
    return (
        <>
            <CustomCategory
                title="Danh sách mục trưng bày"
                categoryList={slideShowList}
                choosingItemId={slideShowId}
            >
                <div className={clsx(styles["memorial-exhibition__content"])}>
                    <div className={clsx(styles["memorial-exhibition__content--inner"])}>
                        <div className={clsx(styles["memorial-exhibition__main"])}>
                            <div className={clsx(styles["memorial-exhibition__img"])}>
                                <img style={{width: "100%", height: "100%"}} src={slideImageMain?.imageLink} alt="Ảnh nghệ thuật"/>
                                <div className={clsx(styles["memorial-exhibition__overlay"])}>
                                    <p>
                                        {slideImageMain?.capture}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles["memorial-exhibition__slide-image"])}>
                            <SlideImage
                                slideImageList={slideImageList}
                                setChoosingImage={setSlideImageMain}
                                choosingImage={slideImageMain}
                                numVisible={4}
                                numScroll={1}
                            />
                        </div>
                    </div>
                </div>
            </CustomCategory>
        </>
    )
}

export default ExhibitionCategory;