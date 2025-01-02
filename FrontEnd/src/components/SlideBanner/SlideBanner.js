import { Carousel } from 'primereact/carousel';
import {banner_1, banner_2, banner_3, banner_4} from '~/assets/img';
import styles from '~/styles/Components/SlideBanner/slidebanner.module.scss';
import clsx from "clsx";

function SlideBanner() {
    const bannerList = [
        {id: 1, imageLink: banner_1, imageName: 'banner 1'},
        {id: 2, imageLink: banner_2, imageName: 'banner 2'},
        {id: 3, imageLink: banner_3, imageName: 'banner 3'},
        {id: 4, imageLink: banner_4, imageName: 'banner 4'},
    ];

    const bannerTemplate = banner => {
        return (
            <>
                <div className={clsx(styles['banner'])}>
                    <img className={clsx(styles['banner-img'])} src={banner.imageLink} alt={banner.imageLink} />
                </div>
            </>
        )
    };

    return (
        <>
            <Carousel value={bannerList}
                      numVisible={1}
                      numScroll={1}
                      className="custom-carousel"
                      circular
                      autoplayInterval={3000}
                      showNavigators={false}
                      showIndicators={false}
                      itemTemplate={bannerTemplate} />
        </>
    )
}

export default SlideBanner;