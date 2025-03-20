import styles from '~/styles/Pages/Memorial/memorialArea.module.scss';
import clsx from "clsx";
import { KLNSlideBanner } from "~/components";
import {ExhibitSection, HistoryList, ImageCarousel} from '~/features/MemorialArea';

const MemorialArea = () => {
    return (
        <>
            <KLNSlideBanner />
            <div className={clsx(styles['memorial'])}>
                <div className={clsx(styles['memorial-info'])}>
                    <div className={clsx(styles['memorial-info__title'])}>
                        KHU LƯU NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG
                    </div>
                </div>
                <ImageCarousel />

                <div className={clsx(styles['memorial-content'])}>

                    <div className={clsx(styles['memorial-content__left'], 'col-lg-8 col-md-8 col-sm-8 p-3')}>
                        <HistoryList />
                    </div>
                    <div className={clsx(styles['memorial-content__right'], 'col-lg-4 col-md-4 col-sm-4 p-3')}>
                        <ExhibitSection />
                    </div>
                </div>
        </div>
        </>
    );
}

export default MemorialArea;
