import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/Button/button.module.scss';
import {Link} from "react-router-dom";

function Button({children,
                    urlLink = '',
                    btnClassName = '',
                    onClick = () => {},
                    options= 1}) {
    return (
        <>
            <Link to={urlLink}>
                <button className={clsx(options === 1 ? styles['button-1'] : styles['button-2'], btnClassName)}
                        onClick={onClick}>
                    {children}
                </button>
            </Link>
        </>
    )
}

export default memo(Button);