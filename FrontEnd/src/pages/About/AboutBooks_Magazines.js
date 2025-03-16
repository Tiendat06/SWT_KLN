import {ItemContent, SidebarBook, SidebarMagazines} from '~/features/About';
import styles from '~/styles/Pages/About/aboutSidebarBooks.module.scss';
import clsx from 'clsx';
import {AboutBooksMagazinesProvider} from "~/context/About/AboutBooksMagazinesContext";

function AboutBooksAndMagazines() {
    return (
        <AboutBooksMagazinesProvider>
            <div className={clsx(styles["aboutbooksandmagazines"])}>
                <div className={clsx(styles["aboutbooksandmagazines-title"])}>
                    <h3 className={clsx(styles['aboutbooksandmagazines-title__text'])}>
                        TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                    </h3>
                </div>
            </div>
            <div className={clsx(styles["aboutbooks-container"])}>
                <div className={clsx(styles["sidebars"])}>
                    <div className={clsx(styles["sidebar"])}><SidebarBook /></div>
                    <div className={clsx(styles["sidebar"])}><SidebarMagazines /></div>
                </div>
                <div className={clsx(styles["book-content"])}>
                    <ItemContent />
                </div>
            </div>
        </AboutBooksMagazinesProvider>
    );
}

export default AboutBooksAndMagazines;
