import {clsx} from "clsx";
import styles from '~/styles/Components/KLNDropdown/klnDropdown.module.scss';
import {memo} from "react";
import {Link} from "react-router-dom";

const KLNDropdown = ({
                         itemList = [{id: 0, href: '', text: ''},],
                         setDropdownVisible = () => {
                         }
                     }) => {

    return (
        <ul style={{
            paddingLeft: 0,
        }} onMouseMove={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
            className={clsx(styles["kln-dropdown"], "position-absolute z-3 w-100")}>
            {itemList?.map((item, index) => (
                <Link to={item?.href} className={clsx(styles["kln-dropdown__link"], "text-center")}
                      key={`KLNDropdown-${index}`}>
                    <p
                        className={clsx(styles["kln-dropdown__para"])}>{item?.text}</p>
                </Link>
            ))}
        </ul>
    )
}

export default memo(KLNDropdown);