import {ItemContent, SidebarBook, SidebarMagazines} from 'src/features/B2C/About';
import styles from '~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss';
import clsx from 'clsx';
import {AboutBooksMagazinesProvider} from "~/context/About/AboutBooksMagazinesContext";
import {KLNTitle} from "~/components";

const AboutBooksAndMagazines = () => {
    return (
        <AboutBooksMagazinesProvider>
            <div className={clsx(styles["aboutbooksandmagazines"])}>
                <KLNTitle>
                    TIỂU SỬ CUỘC ĐỜI VÀ SỰ NGHIỆP CỦA CHỦ TỊCH TÔN ĐỨC THẮNG
                </KLNTitle>
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
