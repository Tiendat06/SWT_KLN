import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/KLNButton/klnButton.module.scss';
import {Link} from "react-router-dom";

const KLNButton = ({children,
                    urlLink = '',
                    btnClassName = '',
                    onClick = () => {},
                    options= 1}) => {
    const buttonStyle = {
        1: styles['button-1'],
        2: styles['button-2'],
        3: styles['button-3'],
    }[options] || styles['button-1'];

    return (
        <>
            <Link to={urlLink}>
                <button className={clsx(buttonStyle, btnClassName)}
                        onClick={onClick}>
                    {children}
                </button>
            </Link>
        </>
    )
}

export default memo(KLNButton);