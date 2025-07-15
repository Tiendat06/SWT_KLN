import {memo} from "react";
import styles from "~/styles/Components/KLNFile/klnFile.module.scss";
import clsx from "clsx";

const KLNFile = ({
                     fileName = '',
                     prefixIcon = null,
                     trailingIcon = null,
                     ...props
                 }) => {

    return (
        <div title={fileName}
             className={clsx("mt-2 d-flex align-items-center w-100 p-2", styles['preview-file'])}>
            <div className="col-lg-1 col-md-1 col-sm-1">
                {prefixIcon ?? prefixIcon}
            </div>
            <div className={'col-lg-10 col-md-10 col-sm-10'}>
                <a target="_blank"
                   download
                   rel="noopener noreferrer"
                   style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 1,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                       ...props.style
                   }}
                   {...props}
                >{fileName}</a>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1">
                {trailingIcon ?? trailingIcon}
            </div>
        </div>
    )
}

export default memo(KLNFile);