import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import React, {useCallback, useState} from "react";
import {useAppContext} from "~/context/AppContext";
import {useAdminContext} from "~/context/AdminContext";
import MediaType from "~/enum/MediaType/MediaType";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {showToast} from "~/utils/Toast";
import {ALLOW_N_FILE, BROWSER_CANNOT_READ_FILE, getValidateMessage, INVALID_FILE} from "~/utils/ErrorMessage";
import {Card} from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/MediaDocument/createImage.module.scss";
import {solar_upload_icon_1} from "~/assets/img";
import {KLNButton} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {Calendar} from "primereact/calendar";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {musicService} from "~/services/MusicService";
import {InputText} from "primereact/inputtext";
import KLNFormItem from "~/components/KLNFormItem/KLNFormItem";

const audioInput = {
    title: '',
    type: MediaType.PresidentTDT,
    author: '',
    imageFile: {},
    audioFile: {},
    userId: '',
}

const CreateAudioForm = () => {
    const {isLoading, setIsLoading} = useManageMultimediaContext();
    const [addedAudio, setAddedAudio] = useState(audioInput);
    const [previewImage, setPreviewImage] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    const handleAddImage = useCallback(() => {
        const addSlideImage = async () => {
            setIsLoading(true);
            const addedAudioData = await musicService.addMusicService(addedAudio);
            const status = addedAudioData.status ?? 400;
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created){
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: "Thêm nhạc",
                    detail: "Thêm nhạc thành công."
                });
                setPreviewImage(null);
                setAddedAudio(audioInput);
            }
            else
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: "Thêm nhạc",
                    detail: addedAudioData?.message,
                })
            setIsLoading(false);
        }
        addSlideImage();
    }, [addedAudio]);

    const handleFile = (files) => {
        const isImage = files[0].type.startsWith("audio/");
        const isSizeOk = files[0].size <= 4000 * 1024 * 1024;
        if (isImage && isSizeOk) {
            setAddedAudio({
                ...addedAudio,
                audioFile: files[0]
            });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải nhạc lỗi',
                detail: INVALID_FILE
            });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;

        if (files.length > 0 && files.length <= 1) {
            handleFile(files);
        } else if (files.length === 0) {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải nhạc lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải nhạc lỗi',
                detail: getValidateMessage(ALLOW_N_FILE, {
                    imageCount: 1
                })
            });
        }
    };

    const handleUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files);
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải nhạc lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        }
    };

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải nhạc lên</h6>}>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={clsx(styles["create-image__add--image"])}
                        >
                            <div className="text-center">
                                <img src={solar_upload_icon_1} alt="Icon upload"/>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kéo thả tệp tại đây</p>
                                <p className="mb-0 col-lg-12 col-md-12 col-sm-12">Kích thước tối đa 4GB với định dạng
                                    mp3,
                                    wav,...</p>
                                <KLNButton
                                    options={KLNButtonEnum.blackBtn}
                                    hasFileInput={true}
                                    onHandleFileChange={handleUpload}
                                    style={{
                                        cursor: "pointer",
                                        marginTop: 10
                                    }}
                                >Tải nhạc lên</KLNButton>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                    <Card title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Xem trước</h6>}>
                        <div style={{
                            height: 350
                        }} className={clsx(styles["create-image__preview--image"])}>
                            <div style={{
                                height: "60%"
                            }} className={clsx(styles['create-image__preview--image__src'])}>
                                {previewImage && (
                                    <img src={previewImage} alt="Hình ảnh xem trước"/>
                                )}
                            </div>
                            <div style={{
                                height: "40%"
                            }} className={clsx(styles["create-image__preview--image__content"], 'bg-light')}>
                                <h6 style={{
                                    fontWeight: 'bold'
                                }}>Nội dung:</h6>
                                <p title={addedAudio?.description}>{addedAudio?.description}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-7 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thông tin chi tiết</h5>
                    <Card className="w-100 card-details">
                        <KLNFormItem
                            label="Tiêu đề"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedAudio?.title}
                            onChange={(e) => setAddedAudio({
                                ...addedAudio,
                                title: e.target.value,
                            })}
                            placeholder="Nhập tiêu đề"
                        />
                        <KLNFormItem
                            label="Tác giả"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedAudio?.author}
                            onChange={(e) => setAddedAudio({
                                ...addedAudio,
                                author: e.target.value,
                            })}
                            placeholder="Nhập tên tác giả"
                        />
                    </Card>
                </div>

                <div className="d-flex flex-wrap justify-content-center w-100">
                    <KLNButton
                        isLoading={isLoading}
                        btnClassName="mt-4 mr-5"
                        options={KLNButtonEnum.dangerBtn}
                        onClick={handleAddImage}
                    >Lưu</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        btnClassName="mt-4 ml-5"
                        onClick={() => setTabView(TabViewEnum.ManageMultimediaTabAudio)}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}
                    >Hủy</KLNButton>
                </div>
            </div>
        </>
    )
}

export default CreateAudioForm;