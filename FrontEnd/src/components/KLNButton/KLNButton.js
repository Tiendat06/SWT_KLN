import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/KLNButton/klnButton.module.scss';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {KLNProgressSpinner} from "~/components";

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
                       isLoading = false,
                       mode = "light",
                       ...props
                   }) => {
    const buttonStyle = {
        1: styles['button-1'],
        2: styles['button-2'],
        3: styles['button-3'],
        4: styles['button-4'],
        5: styles['button-5'],
        6: styles['button-6'],
        7: styles['button-7'],
    }[options] || styles['button-1'];

    return (
        <>
            {!hasFileInput ?
                (
                    <Link to={urlLink}>
                        <button {...props} style={style} className={clsx(buttonStyle, btnClassName)}
                                onClick={onClick}>
                            <span className="d-flex align-items-center justify-content-center">
                                {isLoading && <KLNProgressSpinner
                                    strokeWidth={5}
                                    mode={mode}
                                    style={{
                                        marginRight: 5,
                                        fontWeight: "bold",
                                        color: "white"
                                    }}/>}
                                {children}
                                {icon && !isLoading && <FontAwesomeIcon style={iconStyle} icon={icon}/>}
                            </span>
                        </button>
                    </Link>
                ) :
                (
                    <>
                        <label htmlFor="fileUpload" style={style} className={clsx(buttonStyle, btnClassName)}
                               onClick={onClick}>
                            <span className="d-flex align-items-center justify-content-center">
                                {isLoading && <KLNProgressSpinner
                                    strokeWidth={5}
                                    mode={mode}
                                    style={{
                                        marginRight: 5,
                                        fontWeight: "bold",
                                        color: "white"
                                    }}/>}
                                {children}
                                {icon && !isLoading && <FontAwesomeIcon style={iconStyle} icon={icon}/>}
                            </span>
                            {/*{isLoading && <KLNProgressSpinner/>}*/}
                            {/*{children}*/}
                            {/*{icon && !isLoading && <FontAwesomeIcon style={iconStyle} icon={icon}/>}*/}
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