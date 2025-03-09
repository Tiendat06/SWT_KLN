import {Carousel} from "primereact/carousel";
import {next_icon_1, previous_icon_1} from "~/assets/img";
import clsx from "clsx";
import styles from "~/styles/Components/SlideImage/slideImage.module.scss";
import { memo } from "react";

function SlideImage({slideImageList, setChoosingImage, choosingImage}) {

    const onClickImage = (slideImage) => {
        setChoosingImage(slideImage);
    }

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
        { breakpoint: '768px', numVisible: 4, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ]

    const slideImageTemplate = slideImage => {
        var isSelected = choosingImage === slideImage?.imageLink;
        return (
            <>
                <div style={{width: "100%"}} className={clsx(styles["about-card--carousel"] /*,{ [styles["selected"]]: isSelected }*/)}>
                    <img
                        style={{
                            border: isSelected ? "2px solid red" : "none",
                            cursor: "pointer",
                            transition: "border 0.2s ease-in-out"
                        }}
                        onClick={() => onClickImage(slideImage)}
                        className={clsx(styles['about-card__img'])} src={slideImage?.imageLink} alt=""/>
                </div>
            </>
        )
    };

    return (
        <>
            <Carousel value={slideImageList}
                    numVisible={4}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular={true}
                    autoplayInterval={3000}
                    showNavigators={true}
                    showIndicators={false}
                    nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                    prevIcon={<img src={`${previous_icon_1}`} alt="Previous" style={{width: "30px", height: "30px"}}/>}
                    itemTemplate={slideImageTemplate}/>
        </>
    )
}

export default memo(SlideImage);