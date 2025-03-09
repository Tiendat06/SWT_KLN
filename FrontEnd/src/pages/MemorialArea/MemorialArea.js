import styles from '~/styles/Pages/Memorial/memorialArea.module.scss';
import clsx from "clsx";
import { SlideBanner, ImageCarousel, HistoryList, ExhibitSection } from "~/components";

function MemorialArea() {
    return (
        <>
            <SlideBanner />
            <div className={clsx(styles['memorial'])}>
                <div className={clsx(styles['memorial-info'])}>
                    <div className={clsx(styles['memorial-info__title'])}>
                        KHU LƯU NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG
                    </div>
                </div>
                <ImageCarousel />

                {/* Bố cục flexbox để căn trái phải */}

                <div className={clsx(styles['memorial-content'])}>

                    <div className={clsx(styles['memorial-content__left'])}>
                        <HistoryList />
                    </div>
                    <div className={clsx(styles['memorial-content__right'])}>
                        <ExhibitSection />
                    </div>
                </div>
        </div>
        </>
    );
}

export default MemorialArea;
