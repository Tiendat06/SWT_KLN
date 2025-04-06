import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialArtifacts.module.scss';
import {MemorialArtifactProvider} from "~/context/B2C/MemorialArea/MemorialArtifactContext";
import {SlideShow} from "src/features/B2C/MemorialArea";

const MemorialArtifacts = () => {

    return (
        <MemorialArtifactProvider>
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