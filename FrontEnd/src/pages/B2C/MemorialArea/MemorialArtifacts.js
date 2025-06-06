import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialArtifacts.module.scss';
import {MemorialArtifactProvider} from "~/context/B2C/MemorialArea/MemorialArtifactContext";
import {SlideShow} from "src/features/B2C/MemorialArea";
import {MEMORIAL_TDT_TITLE} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";

const MemorialArtifacts = () => {

    return (
        <MemorialArtifactProvider>
            <Helmet>
                <title>{MEMORIAL_TDT_TITLE}</title>
            </Helmet>
            <div className={clsx(styles["memorial-artifact"])}>
                <KLNTitle>
                    HIỆN VẬT VÀ HÌNH ẢNH
                </KLNTitle>
                <SlideShow />
            </div>
        </MemorialArtifactProvider>
    )
};

export default MemorialArtifacts;