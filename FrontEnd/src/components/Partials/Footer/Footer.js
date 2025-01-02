import clsx from "clsx";
import styles from '~/styles/Layouts/footer.module.scss';

function Footer() {
    return (
        <>
            <footer className={clsx(styles['footer'])}>
                <p className={clsx(styles['footer-bottom'])}>&copy; Copyright 2024 - Đại học Tôn Đức Thắng.</p>
            </footer>
        </>
    )
}

export default Footer;