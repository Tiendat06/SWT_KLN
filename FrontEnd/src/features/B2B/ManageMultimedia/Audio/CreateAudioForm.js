import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import React, {useCallback, useState} from "react";
import {useAppContext} from "~/context/AppContext";
import {useAdminContext} from "~/context/AdminContext";
import MediaType from "~/enum/MediaType/MediaType";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {showToast} from "~/utils/Toast";
import {BROWSER_CANNOT_READ_FILE, INVALID_FILE} from "~/utils/ErrorMessage";
import {Card} from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createAudioForm.module.scss";
import {KLNButton, KLNUploadFile} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {musicService} from "~/services/MusicService";
import KLNFormItem from "~/components/KLNFormItem/KLNFormItem";
import AddSolidIcon from "~/assets/icon/AddSolidIcon";
import PlayBrokenIcon from "~/assets/icon/PlayBrokenIcon";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import {TEST_USER_ID} from "~/utils/Constansts";

const audioInput = {
    title: '',
    type: MediaType.PresidentTDT,
    author: '',
    imageFile: {},
    audioFile: {},
    userId: TEST_USER_ID,
}

const CreateAudioForm = () => {
    const {isLoading, setIsLoading} = useManageMultimediaContext();
    const [addedAudio, setAddedAudio] = useState(audioInput);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    const handleAddImage = useCallback(() => {
        const addAudio = async () => {
            setIsLoading(true);
            const addedAudioData = await musicService.addMusicService(addedAudio);
            const status = addedAudioData.status ?? 400;
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created) {
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: "Thêm nhạc",
                    detail: "Thêm nhạc thành công."
                });
                setPreviewImage(null);
                setAddedAudio(audioInput);
            } else
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: "Thêm nhạc",
                    detail: addedAudioData?.message,
                })
            setIsLoading(false);
        }
        addAudio();
    }, [addedAudio]);

    const handleFile = (files, fileType) => {
        const isFile = files[0].type.startsWith(fileType);
        const isSizeOk = files[0].size <= 4000 * 1024 * 1024;
        if (isFile && isSizeOk) {
            setAddedAudio({
                ...addedAudio,
                audioFile: files[0]
            });
            setPreviewAudio(files[0]);
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: INVALID_FILE
            });
        }
    };

    const handleUploadAudio = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files, "audio/");
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải nhạc lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        }
    }

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh bìa lên</h6>}>
                        <KLNUploadFile
                            setPreviewImage={setPreviewImage}
                            setData={setAddedAudio}
                            data={addedAudio}
                            fileFieldName="imageFile"
                            fileExtension={"jpg, png"}
                            fileSizeLimitMb={250}
                        />
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
                                }}>Tiêu đề:</h6>
                                <p title={addedAudio?.title}>{addedAudio?.title || <i>--N/A--</i>}</p>
                                <h6 style={{
                                    fontWeight: 'bold',
                                    marginTop: 10
                                }}>Tác giả:</h6>
                                <p title={addedAudio?.author}>{addedAudio?.author || <i>--N/A--</i>}</p>
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
                <div className="col-lg-5 col-md-5 col-sm-5 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thêm nhạc</h5>
                    <Card className="w-100 card-details">
                        <div
                            style={{
                                cursor: 'pointer'
                            }} className={clsx("d-flex flex-wrap align-item-center col-lg-12 col-md-12 col-sm-12 p-2")}>
                            <label
                                htmlFor="audioUpload"
                                style={{
                                    fontWeight: 'bold'
                                }} className={clsx("w-100")}>
                                <AddSolidIcon className="" style={{
                                    marginRight: '10px',
                                }}/>
                                Tải nhạc lên
                                <p className='mb-0'>Kích thước tối đa 4GB với định dạng jpg, png,...</p>
                            </label>
                            <input type="file" id="audioUpload"
                                   accept="audio/*"
                                   style={{display: "none"}}
                                   onChange={handleUploadAudio}/>
                            {previewAudio && (
                                <div className={clsx("mt-2 d-flex align-items-center", styles['preview-audio'])}>
                                    <PlayBrokenIcon width={30} height={30} style={{
                                        marginRight: "5px"
                                    }}/>
                                    <span style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>{previewAudio.name}</span>
                                    <TrashBrokenIcon
                                        onClick={() => setPreviewAudio(null)}
                                        width={30}
                                        height={30}/>
                                </div>
                            )}
                        </div>
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