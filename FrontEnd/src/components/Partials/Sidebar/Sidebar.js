import clsx from "clsx";
import styles from '~/styles/Layouts/sidebar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFile, faBook, faFolderMinus, faHome, faImage } from '@fortawesome/free-solid-svg-icons'
import {useAdminContext} from "~/context/AdminContext";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {Link} from "react-router-dom";

const Sidebar = () => {
    const {sideBarCategory, setSideBarCategory} = useAdminContext();
    const sidebarContent = [
        {id: 1, title: 'Tài liệu đa phương tiện', path: `${AppRoutesEnum.AdminRoute}/manage-multimedia`, icon: (<FontAwesomeIcon icon={faFile} />)},
        {id: 2, title: 'Sách, Báo & Tạp Chí', path: `${AppRoutesEnum.AdminRoute}/manage-magazine`, icon: (<FontAwesomeIcon icon={faBook} />)},
        {id: 3, title: 'Chuyên đề hay về Bác', path: `${AppRoutesEnum.AdminRoute}/manage-topic`, icon: (<FontAwesomeIcon icon={faFolderMinus} />)},
        {id: 4, title: 'Nhà trưng bày', path: `${AppRoutesEnum.AdminRoute}/manage-exhibition`, icon: (<FontAwesomeIcon icon={faHome} />)},
        {id: 5, title: 'Hiện vật & Hình Ảnh', path: `${AppRoutesEnum.AdminRoute}/manage-images`, icon: (<FontAwesomeIcon icon={faImage} />)},
    ];

    return (
        <>
            <header className={clsx(styles["sidebar"])}>
                <div className={clsx(styles["sidebar-header"])}>
                    <h1>KLN.</h1>
                    <p>Đại Học Tôn Đức Thắng</p>
                </div>
                <ul className={clsx(styles["sidebar-list"])}>
                    {sidebarContent?.map((item, index) => (
                        <Link
                            to={item.path}
                            key={`sidebar-${item.id}-${index}`}
                            onClick={() => setSideBarCategory(item.id)}
                            className={clsx(
                                'd-flex flex-wrap align-items-center',
                                styles["sidebar-item"],
                                (sideBarCategory === item.id && styles["sidebar-item--active"]))}
                        >
                            <p style={{
                                marginRight: 10
                            }}>{item?.icon}</p>
                            <p>{item?.title}</p>
                        </Link>
                    ))}
                </ul>
            </header>
        </>
    );
}

export default Sidebar;