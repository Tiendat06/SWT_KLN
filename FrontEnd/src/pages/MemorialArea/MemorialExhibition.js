import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/Memorial/memorialExhibition.module.scss';
import ExhibitionCategory from "~/features/MemorialArea/MemorialExhibition/ExhibitionCategory";

const MemorialExhibition = () => {

    return (
        <>
            <div className={clsx(styles["memorial-exhibition"])}>
                <KLNTitle>
                    NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG
                </KLNTitle>
                <div className={clsx(styles["memorial-exhibition__content"])}>
                    <ExhibitionCategory />
                </div>
            </div>
        </>
    )
}

export default MemorialExhibition;