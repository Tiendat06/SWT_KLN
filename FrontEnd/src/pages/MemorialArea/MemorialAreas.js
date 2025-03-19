import {KLNSlideBanner,} from "~/components";
import {MemorialAreasProvider} from "~/context/MemorialArea/MemorialAreasContext";
import {SlideContents} from "~/features/MemorialArea";
import clsx from "clsx";
import styles from "~/styles/Pages/Memorial/memorialAreas.module.scss";

function MemorialAreas() {
    return (
        <MemorialAreasProvider>
            <>
                <KLNSlideBanner/>
                <h1 className={clsx(styles["memorial-title"])}>KHU LƯU NIỆM CHỦ TỊCH TÔN ĐỨC THẮNG</h1>
                <SlideContents />
                <div className='d-flex flex-wrap'>

                </div>
            </>

        </MemorialAreasProvider>
    )
}

export default MemorialAreas;