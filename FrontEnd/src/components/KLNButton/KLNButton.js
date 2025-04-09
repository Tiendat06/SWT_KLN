import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/KLNButton/klnButton.module.scss';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const KLNButton = ({
                       children,
                       urlLink = '',
                       btnClassName = '',
                       onClick = () => {
                       },
                       options = 1,
                       icon = null,
                       style = {},
                       iconStyle = {}
                   }) => {
    const buttonStyle = {
        1: styles['button-1'],
        2: styles['button-2'],
        3: styles['button-3'],
        4: styles['button-4'],
        5: styles['button-5'],
    }[options] || styles['button-1'];

    return (
        <>
            <Link to={urlLink}>
                <button style={style} className={clsx(buttonStyle, btnClassName)}
                        onClick={onClick}>
                    {children}
                    {icon && <FontAwesomeIcon style={iconStyle} icon={icon} />}
                </button>
            </Link>
        </>
    )
}

export default memo(KLNButton);