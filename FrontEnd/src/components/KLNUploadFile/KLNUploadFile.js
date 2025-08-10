import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss";
import {solar_upload_icon_1} from "~/assets/img";
import {KLNButton} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import React, {memo} from "react";
import {showToast} from "~/utils/Toast";
import {ALLOW_N_FILE, BROWSER_CANNOT_READ_FILE, getValidateMessage, INVALID_FILE} from "~/utils/ErrorMessage";
import {useAppContext} from "~/context/AppContext";
import UploadFileOption from "~/enum/UploadFileOption/UploadFileOption";

const KLNUploadFile = ({
                           fileType = "image/",
                           setPreviewImage = () => {
                           },
                           data = null,
                           setData = () => {
                           },
                           fileLimit = 1,
                           fileExtension = '',
                           fileSizeLimitText = '25MB',
                           fileSizeLimitMb = 250,
                           fileFieldName = 'file',
                           uploadFileOption = UploadFileOption.Multimedia,
                           dispatch = null,
                       }) => {
    const {toast} = useAppContext();

    const handleFile = (files, fileType) => {
        const isFile = files[0].type.startsWith(fileType);
        const isSizeOk = files[0].size <= fileSizeLimitMb * 1024 * 1024;
        // console.log({isFile, isSizeOk, type: files[0].type})
        if (isFile && isSizeOk) {
            if (typeof dispatch === "function"){
                dispatch(setData({
                    ...data,
                    [fileFieldName]: files[0],
                }))
            } else{
                setData({
                    ...data,
                    [fileFieldName]: files[0]
                });
            }
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: INVALID_FILE
            });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;

        if (files.length > 0 && files.length <= 1) {
            handleFile(files, fileType);
        } else if (files.length === 0) {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: getValidateMessage(ALLOW_N_FILE, {
                    imageCount: fileLimit
                })
            });
        }
    };

    const handleUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files, fileType);
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        }
    };

    return (
        <>
            {uploadFileOption === UploadFileOption.Multimedia && (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={clsx(styles["create-image__add--image"])}
                >
                    <div className="text-center">
                        <img src={solar_upload_icon_1} alt="Icon upload"/>
                        <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kéo thả tệp tại đây</p>
                        <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kích thước tối đa {fileSizeLimitText} với định
                            dạng&nbsp;{fileExtension},...</p>
                        <KLNButton
                            options={KLNButtonEnum.blackBtn}
                            hasFileInput={true}
                            onHandleFileChange={handleUpload}
                            style={{
                                cursor: "pointer",
                                marginTop: 10
                            }}
                        >Tải file lên</KLNButton>
                    </div>
                </div>
            )
            }
        </>
    )

}

export default memo(KLNUploadFile);