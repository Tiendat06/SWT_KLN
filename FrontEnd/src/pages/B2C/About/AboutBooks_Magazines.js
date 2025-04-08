import {ItemContent, SidebarBook, SidebarMagazines} from 'src/features/B2C/About';
import styles from '~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss';
import clsx from 'clsx';
import {AboutBooksMagazinesProvider} from "~/context/B2C/About/AboutBooksMagazinesContext";
import {KLNTitle} from "~/components";
import {Helmet} from "react-helmet-async";
import {BOOK_MAGAZINE_TITLE} from "~/utils/Constansts";

const AboutBooksAndMagazines = () => {
    return (
        <AboutBooksMagazinesProvider>
            <Helmet>
                <title>{BOOK_MAGAZINE_TITLE}</title>
            </Helmet>
            <div className={clsx(styles["aboutbooksandmagazines"])}>
                <KLNTitle>
                    BÁO - TẠP CHÍ
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
