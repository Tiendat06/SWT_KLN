import styles from '~/styles/Pages/About/about.module.scss';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {aboutJRoutes} from '~/routes/appRoutes';
import {Carousel} from "primereact/carousel";
import {next_icon_1, previous_icon_1} from '~/assets/img';
import {getMasterPieceList} from "~/services/AboutService";

function TDTMasterpiece() {
    const masterPieceList = getMasterPieceList();

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
        { breakpoint: '768px', numVisible: 4, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ]

    const masterPieceTemplate = masterpiece => {
        return (
            <>
                <Link to={aboutJRoutes[0].path} key={masterpiece.bookId} className={clsx(styles["about-masterpiece__card"])}>
                    <div className={clsx(styles["about-masterpiece__card-img"])}>
                        <img className={clsx(styles["about-masterpiece__card-img-item"])} src={masterpiece.image} alt=""/>
                        <div className={clsx(styles["about-masterpiece__card-overlay"])}></div>
                    </div>
                    <p className={clsx(styles['about-masterpiece__card-title'])}>{masterpiece.title}</p>
                </Link>
            </>
        )
    };

    return (
        <>
            <div className={clsx(styles["about-masterpiece"])}>
                <div className={clsx(styles["about-masterpiece__title"])}>
                    <p className={clsx(styles['about-masterpiece__title-text'])}>TÁC PHẨM MANG TÊN BÁC TÔN</p>
                    <Link to={aboutJRoutes[3].path} className={clsx(styles['about-masterpiece__title-more'])}>Xem thêm</Link>
                </div>
                <div className={clsx(styles["about-masterpiece__list"])}>
                    <Carousel value={masterPieceList}
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
                              itemTemplate={masterPieceTemplate}/>
                </div>
            </div>
        </>
    )
}

export default TDTMasterpiece;