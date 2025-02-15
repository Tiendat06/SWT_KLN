import styles from '~/styles/Pages/About/about.module.scss';
import clsx from "clsx";
import {Link} from "react-router-dom";

import {aboutJRoutes} from '~/routes/appRoutes';
import {next_icon_1, previous_icon_1} from '~/assets/img';
import {getHandiworkList} from "~/services/AboutService";

import {Carousel} from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {useEffect, useState} from "react";

function TDTHandiwork() {
    const [handiworkList, setHandiworkList] = useState([]);

    useEffect(() => {
        const GetHandiworkList = async () => {
            const data = await getHandiworkList(0, 1);
            setHandiworkList(data.data);
        }
        GetHandiworkList();
    }, []);

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
        { breakpoint: '768px', numVisible: 4, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ]

    const handiworkTemplate = handiwork => {
        return (
            <>
                <Link
                    to={aboutJRoutes[0].path} key={handiwork.bookId} className={clsx(styles["about-handiwork__card"])}>
                    <div className={clsx(styles["about-handiwork__card-img"])}>
                        <img className={clsx(styles["about-handiwork__card-img-item"])} src={handiwork.image} alt=""/>
                        <div className={clsx(styles["about-handiwork__card-overlay"])}></div>
                    </div>
                    <p className={clsx(styles['about-handiwork__card-title'])}>{handiwork.title}</p>
                </Link>
            </>
        )
    };

    return (
        <>
            <div className={clsx(styles["about-handiwork"], 'mb-50')}>
                <div className={clsx(styles["about-handiwork__title"])}>
                    <p className={clsx(styles['about-handiwork__title-text'])}>CHUYÊN ĐỀ HAY VỀ BÁC</p>
                    {/*<Link to={aboutJRoutes[0].path} className={clsx(styles['about-handiwork__title-more'])}>Xem thêm</Link>*/}
                </div>
                <div className={clsx(styles["about-handiwork__list"])}>
                    <Carousel value={handiworkList}
                              numVisible={4}
                              numScroll={1}
                              responsiveOptions={responsiveOptions}
                              className="custom-carousel"
                              circular={true}
                              autoplayInterval={3000}
                              showNavigators={false}
                              // showIndicators={false}
                              nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                              prevIcon={<img src={`${previous_icon_1}`} alt="Previous" style={{width: "30px", height: "30px"}}/>}
                              itemTemplate={handiworkTemplate}/>
                </div>
            </div>
        </>
    )
}

export default TDTHandiwork;