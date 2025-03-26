import clsx from "clsx";
import React from "react";
import styles from '~/styles/Components/KLNTabView/klnTabView.module.scss';
import {useAdminContext} from "~/context/AdminContext";
import {Badge} from "primereact/badge";

const KLNTabView = ({
                        data,
                    }) => {
    const {tabView, setTabView} = useAdminContext();

    return (
        <ul className={clsx(styles['tab-view'], 'd-flex flex-wrap')}>
            {data?.map((item, index) => (
                <li onClick={() => setTabView(item.tabView)}
                    className={clsx(styles['tab-view__item'],
                        (tabView === item.tabView && styles['tab-view__item--active']),
                        'd-flex align-items-center p-3')}
                    key={`tab-view-${index}`}>
                    <p className={clsx(styles['tab-view__para'], 'mb-0')}>
                        {item.title}
                    </p>
                    {/*<Badge value={item.count} />*/}
                </li>
            ))}
        </ul>
    );
}

export default KLNTabView;