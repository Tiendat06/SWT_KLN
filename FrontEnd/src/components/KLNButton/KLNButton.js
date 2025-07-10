import {memo} from "react";
import clsx from "clsx";
import styles from '~/styles/Components/KLNButton/klnButton.module.scss';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {KLNProgressSpinner} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

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
        [KLNButtonEnum.dangerBtn]: styles['button-1'],
        [KLNButtonEnum.secondaryBtn]: styles['button-2'],
        [KLNButtonEnum.warningBtn]: styles['button-3'],
        [KLNButtonEnum.secondDangerBtn]: styles['button-4'],
        [KLNButtonEnum.successBtn]: styles['button-5'],
        [KLNButtonEnum.blackBtn]: styles['button-6'],
        [KLNButtonEnum.whiteBtn]: styles['button-7'],
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