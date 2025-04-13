import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {logout_icon} from '~/assets/img';
import styles from '~/styles/Layouts/adminHeader.module.scss';
import clsx from "clsx";

const AdminHeader = () => {

    return (
        <>
            <div className="d-flex flex-wrap align-items-center p-4">
                <IconField iconPosition="left" className={clsx('col-lg-11 col-md-11 col-sm-11')}>
                    <InputIcon className="pi pi-search" />
                    <InputText style={{
                        width: "100%",
                        fontSize: 14
                    }} placeholder="Tìm kiếm" />
                </IconField>

                <div className={clsx(styles["admin-header__settings"], 'col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center')}>
                    <div className={clsx(styles["admin-header__settings--inner"], 'd-flex justify-content-center align-items-center')}>
                        <img style={{
                            width: 15,
                            height: 15,
                        }} src={logout_icon} alt=""/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHeader;