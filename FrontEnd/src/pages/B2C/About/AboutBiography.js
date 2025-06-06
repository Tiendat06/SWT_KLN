import clsx from "clsx";
import styles from '~/styles/Pages/B2C/About/aboutBiography.module.scss';
import {KLNTitle} from "~/components";

function AboutBiography() {
    return (
        <>
            <div className={clsx(styles["aboutbiography"])}>
                <KLNTitle>
                    TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>
            </div>
        </>
    )
}

export default AboutBiography;