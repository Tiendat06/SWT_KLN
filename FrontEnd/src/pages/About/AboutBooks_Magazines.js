import { ListOfBooks, ListOfMagazines } from '~/features/About';
import styles from '~/styles/Pages/About/aboutSidebarBooks.module.scss';
import clsx from 'clsx';
import { SlidebarBook, SlidebarMagazines } from "~/components";

function AboutBooksAndMagazines() {
    return (
        <>
            <div className={clsx(styles["aboutbooksandmagazines"])}>
                <div className={clsx(styles["aboutbooksandmagazines-title"])}>
                    <h3 className={clsx(styles['aboutbooksandmagazines-title__text'])}>
                        TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                    </h3>
                </div>
            </div>
            <div className={clsx(styles["aboutbooks-container"])}>
                <div className={clsx(styles["sidebars"])}>
                    <div className={clsx(styles["sidebar"])}><SlidebarBook /></div>
                    <div className={clsx(styles["sidebar"])}><SlidebarMagazines /></div>
                </div>
                <div className={clsx(styles["book-content"])}><ListOfBooks /></div>
            </div>
        </>
    );
}

export default AboutBooksAndMagazines;
