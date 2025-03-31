import clsx from "clsx";
import {KLNTitle} from "~/components";
import styles from '~/styles/Pages/B2C/Memorial/memorialArtifacts.module.scss';
import {MemorialArtifactProvider} from "~/context/MemorialArea/MemorialArtifactContext";
import {SlideShow} from "~/features/MemorialArea";

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