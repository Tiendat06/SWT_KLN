import clsx from "clsx";
import styles from "~/styles/Pages/Memorial/memorialAreas.module.scss";
import {Carousel} from "primereact/carousel";
import {next_icon_1, previous_icon_1} from "~/assets/img";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMagazineListService} from "~/services/AboutService";

const SlideContents = () => {
    const [handiworkList, setHandiworkList] = useState([]);

    useEffect(() => {
        const getHandiworkList = async () => {
            const data = await getMagazineListService(0, 1);
            setHandiworkList(data?.data?.items);
            console.log(data?.data?.items);
        }
        getHandiworkList();
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
                    to='/' key={handiwork?.bookId} className={clsx(styles["memorial-handiwork__card"])}>
                    <div className={clsx(styles["memorial-handiwork__card-img"])}>
                        <img className={clsx(styles["memorial-handiwork__card-img-item"])} src={handiwork?.image} alt=""/>
                        <div className={clsx(styles["memorial-handiwork__card-overlay"])}></div>
                    </div>
                    <p className={clsx(styles['memorial-handiwork__card-title'])}>{handiwork?.title}</p>
                </Link>
            </>
        )
    };

    return (
        <>
            <div className={clsx(styles["memorial-handiwork"], 'mb-50')}>
                <div className={clsx(styles["memorial-handiwork__list"])}>
                    <Carousel value={handiworkList}
                              numVisible={4}
                              numScroll={1}
                              responsiveOptions={responsiveOptions}
                              className="custom-carousel"
                              circular={true}
                              autoplayInterval={3000}
                              showNavigators={true}
                              nextIcon={<img src={`${next_icon_1}`} alt="Next" style={{width: "30px", height: "30px"}}/>}
                              prevIcon={<img src={`${previous_icon_1}`} alt="Previous" style={{width: "30px", height: "30px"}}/>}
                              itemTemplate={handiworkTemplate}/>
                </div>
            </div>
        </>
    )
}

export default SlideContents;