import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialExhibition.module.scss';
import ExhibitionCategory from "~/features/B2C/MemorialArea/MemorialExhibition/ExhibitionCategory";
import {MemorialExhibitionProvider} from "~/context/B2C/MemorialArea/MemorialExhibitionContext";
import {MEMORIAL_TDT_TITLE} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";

const MemorialExhibition = () => {

    return (
        <MemorialExhibitionProvider>
            <Helmet>
                <title>{MEMORIAL_TDT_TITLE}</title>
            </Helmet>
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