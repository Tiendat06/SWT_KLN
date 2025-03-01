import styles from '~/styles/Pages/About/aboutArt.module.scss';
import clsx from "clsx";
import KLNTitle from "~/components/KLNTitle/KLNTitle";

function AboutArt(){

    return (
        <>
            <div className={clsx(styles["about-art"])}>
                <KLNTitle>
                    HÌNH ẢNH NGHỆ THUẬT VỀ CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>
            </div>
        </>
    );
}

export default AboutArt;