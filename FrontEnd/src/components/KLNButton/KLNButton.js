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
                       iconStyle = {},
                       hasFileInput = false,
                       onHandleFileChange = () => {
                       },
                       acceptedFileType = 'image/*',
                   }) => {
    const buttonStyle = {
        1: styles['button-1'],
        2: styles['button-2'],
        3: styles['button-3'],
        4: styles['button-4'],
        5: styles['button-5'],
        6: styles['button-6'],
    }[options] || styles['button-1'];

    return (
        <>
            {!hasFileInput ?
                (
                    <Link to={urlLink}>
                        <button style={style} className={clsx(buttonStyle, btnClassName)}
                                onClick={onClick}>
                            {children}
                            {icon && <FontAwesomeIcon style={iconStyle} icon={icon}/>}
                        </button>
                    </Link>
                ) :
                (
                    <>
                        <label htmlFor="fileUpload" style={style} className={clsx(buttonStyle, btnClassName)}
                               onClick={onClick}>
                            {children}
                            {icon && <FontAwesomeIcon style={iconStyle} icon={icon}/>}
                        </label>
                        <input type="file"
                               id="fileUpload"
                               accept={acceptedFileType}
                               onChange={onHandleFileChange}
                               style={{display: "none"}}
                        />
                    </>
                )
            }
        </>
    )
}

export default memo(KLNButton);