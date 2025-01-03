import clsx from "clsx";
import styles from '~/styles/Layouts/footer.module.scss';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className={clsx(styles['footer'])}>
                <p className={clsx(styles['footer-bottom'])}>&copy; Copyright {currentYear} - Đại học Tôn Đức Thắng.</p>
            </footer>
        </>
    )
}

export default Footer;