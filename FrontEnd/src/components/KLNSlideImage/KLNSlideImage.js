import {Carousel} from "primereact/carousel";
import {next_icon_1, previous_icon_1} from "~/assets/img";
import clsx from "clsx";
import styles from "~/styles/Components/KLNSlideImage/klnSlideImage.module.scss";
import {memo} from "react";

function KLNSlideImage({
                           slideImageList,
                           setChoosingImage,
                           choosingImage,
                           numVisible = 4,
                           numScroll = 1,
                           isImage = true,
                           ...props
                       }) {

    const onClickImage = (slideImage) => {
        setChoosingImage(slideImage);
    }

    const responsiveOptions = [
        {breakpoint: '1024px', numVisible: 4, numScroll: 1},
        {breakpoint: '768px', numVisible: 4, numScroll: 1},
        {breakpoint: '560px', numVisible: 1, numScroll: 1},
    ]

    const slideImageTemplate = slideImage => {
        let isSelected = isImage ?
            (choosingImage?.imageLink === slideImage?.imageLink) :
            (choosingImage?.videoLink === slideImage?.videoLink);
        return (
            <>
                <div style={{width: "100%"}}
                     className={clsx(styles["about-card--carousel"] /*,{ [styles["selected"]]: isSelected }*/)}>
                    {isImage ? (
                            <img
                                style={{
                                    border: isSelected ? "2px solid red" : "none",
                                    cursor: "pointer",
                                    transition: "border 0.2s ease-in-out"
                                }}
                                onClick={() => onClickImage(slideImage)}
                                className={clsx(styles['about-card__img'])} src={slideImage?.imageLink} alt=""/>
                        ) :
                        (
                            <div style={{
                                position: 'relative',
                                border: isSelected ? "2px solid red" : "none",
                            }}>
                                <iframe src={`${slideImage?.videoLink}`}
                                        onClick={() => onClickImage(slideImage)}
                                        title="YouTube video player"
                                        allow="encrypted-media; picture-in-picture"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: "transparent",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => onClickImage(slideImage)}
                                ></div>
                            </div>
                        )
                    }

                </div>
            </>
        )
    };

    return (
        <>
            <Carousel
                {...props}
                value={slideImageList}
                numVisible={numVisible}
                numScroll={numScroll}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular={true}
                autoplayInterval={3000}
                showNavigators={true}
                showIndicators={false}
                nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                prevIcon={<img src={`${previous_icon_1}`} alt="Previous"
                               style={{width: "30px", height: "30px"}}/>}
                itemTemplate={slideImageTemplate}/>
        </>
    )
}

export default memo(KLNSlideImage);