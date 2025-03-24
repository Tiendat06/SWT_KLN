import clsx from "clsx";
import styles from '~/styles/Layouts/sidebar.module.scss';

const Sidebar = () => {

    const sidebarContent = [
        {},
        {},
        {}
    ]

    return (
        <>
            <header className={clsx(styles["sidebar"])}>
                <div className={clsx(styles["sidebar-header"])}>
                    <h1>KLN</h1>
                    <p>Đại Học Tôn Đức Thắng</p>
                </div>
            </header>
        </>
    );
}

export default Sidebar;