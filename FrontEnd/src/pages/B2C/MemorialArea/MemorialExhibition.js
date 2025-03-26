import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialExhibition.module.scss';
import ExhibitionCategory from "~/features/B2C/MemorialArea/MemorialExhibition/ExhibitionCategory";
import {MemorialExhibitionProvider} from "~/context/MemorialArea/MemorialExhibitionContext";

const MemorialExhibition = () => {

    return (
        <MemorialExhibitionProvider>
            <div className={clsx(styles["memorial-exhibition"])}>
                <KLNTitle>
                    NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG
                </KLNTitle>
                <div className={clsx(styles["memorial-exhibition__content"])}>
                    <ExhibitionCategory />
                </div>
            </div>
        </MemorialExhibitionProvider>
    )
}

export default MemorialExhibition;