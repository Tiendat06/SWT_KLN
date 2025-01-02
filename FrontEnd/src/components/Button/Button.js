import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/Button/button.module.scss';

function Button({children, onClick = () => {}, options= 1}) {
    return (
        <>
            <button className={clsx(options === 1 ? styles['button-1']: styles['button-2'], 'ml-5')} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default memo(Button);