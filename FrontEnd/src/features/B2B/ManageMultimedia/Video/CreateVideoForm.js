import React, { useCallback, useState } from "react";
import { Card } from "primereact/card";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/MediaDocument/createVideo.module.scss";
import { solar_upload_icon_1 } from "~/assets/img";
import { KLNButton } from "~/components";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import {
    ALLOW_N_FILE,
    BROWSER_CANNOT_READ_FILE,
    getValidateMessage,
    INVALID_FILE,
} from "~/utils/ErrorMessage";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import { useAdminContext } from "~/context/AdminContext";
import { addVideoToSpecificSlideShowService } from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const CreateVideoForm = () => {
    const [addedVideo, setAddedVideo] = useState({
        videoFile: {},
        description: "",
    });
    const [previewVideo, setPreviewVideo] = useState(null);
    const { toast } = useAppContext();
    const { setTabView } = useAdminContext();

    const handleAddVideo = useCallback(() => {
        const addVideo = async () => {
            const formData = new FormData();
            formData.append("file", addedVideo.videoFile);
            formData.append("description", addedVideo.description);
            formData.append("mediaType", MediaType.Video);
            formData.append("slideShowType", SlideShowType.TDTArtistic);

            const addedVideoData = await addVideoToSpecificSlideShowService(formData);
            const status = addedVideoData.status;

            if (status === HttpStatusEnum.Ok)
                showToast({
                    toastRef: toast,
                    severity: "success",
                    summary: "Thêm video",
                    detail: "Thêm video thành công.",
                });
            else
                showToast({
                    toastRef: toast,
                    severity: "error",
                    summary: "Thêm video",
                    detail: addedVideoData?.message,
                });
        };
        addVideo();
    }, [addedVideo, toast]);

    const onChangeDescription = (e) => {
        setAddedVideo({
            ...addedVideo,
            description: e.target.value,
        });
    };

    const handleFile = (files) => {
        const isVideo = files[0].type.startsWith("video/");
        const isSizeOk = files[0].size <= 500 * 1024 * 1024;

        if (isVideo && isSizeOk) {
            setAddedVideo({
                ...addedVideo,
                videoFile: files[0],
            });
            setPreviewVideo(URL.createObjectURL(files[0]));
        } else {
            showToast({
                toastRef: toast,
                severity: "error",
                summary: "Tải video lỗi",
                detail: INVALID_FILE,
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
                severity: "error",
                summary: "Tải video lỗi",
                detail: BROWSER_CANNOT_READ_FILE,
            });
        } else {
            showToast({
                toastRef: toast,
                severity: "error",
                summary: "Tải video lỗi",
                detail: getValidateMessage(ALLOW_N_FILE, { imageCount: 1 }),
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
                severity: "error",
                summary: "Tải video lỗi",
                detail: BROWSER_CANNOT_READ_FILE,
            });
        }
    };

    return (
        <div className="d-flex flex-wrap mt-3">
            {/* --- Khối upload --- */}
            <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                <Card title={<h6 className="mb-0 fw-bold">Tải video lên</h6>}>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className={clsx(styles["create-video__add--video"])} // 🔄
                    >
                        <div className="text-center">
                            <img src={solar_upload_icon_1} alt="Icon upload" />
                            <p className="mb-0 col-12">Kéo thả tệp tại đây</p>
                            <p className="mb-0 col-12">
                                Kích thước tối đa 500MB với định dạng jpg, png,...
                            </p>
                            <label
                                className="btn btn-dark mt-3"
                                style={{
                                    cursor: "pointer",
                                    border: "1px solid #ccc", 
                                    borderRadius: "20px", 
                                    padding: "8px 16px", 
                                    display: "inline-block"
                                }}
                            >
                                Tải video lên
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleUpload}
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- Khối xem trước --- */}
            <div className="col-lg-5 col-md-5 col-sm-5 p-3 pt-0">
                <Card title={<h6 className="mb-0 fw-bold">Xem trước</h6>}>
                    <div
                        style={{ height: 350 }}
                        className={clsx(styles["create-video__preview--video"])} // 🔄
                    >
                        <div
                            style={{ height: "60%" }}
                            className={clsx(styles["create-video__preview--video__src"])} // 🔄
                        >
                            {previewVideo && (
                                <video controls style={{ width: "100%", height: "100%" }}>
                                    <source src={previewVideo} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ phát video.
                                </video>
                            )}
                        </div>
                        <div
                            style={{ height: "40%" }}
                            className={clsx(
                                styles["create-video__preview--video__content"], // 🔄
                                "bg-light"
                            )}
                        >
                            <h6 className="fw-bold">Nội dung:</h6>
                            <p title={addedVideo?.description}>{addedVideo?.description}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- Thông tin chi tiết --- */}
            <div className="col-lg-12 col-md-12 col-sm-12 p-3">
                <h5 className="fw-bold">Thông tin chi tiết</h5>
                <Card className="w-100 card-details">
                    <div className="col-lg-8 col-md-8 col-sm-12 p-3">
                        <label className="w-100 mb-2 fw-bold" htmlFor="description">
                            Mô tả
                        </label>
                        <InputTextarea
                            onChange={onChangeDescription}
                            className="w-100"
                            placeholder="Nhập nội dung"
                            rows={5}
                            cols={30}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-3">
                        <label className="w-100 mb-2 fw-bold" htmlFor="calendar">
                            Ngày cập nhật
                        </label>
                        <Calendar
                            disabled
                            className="w-100"
                            id="calendar"
                            value={new Date()}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                    </div>
                </Card>
            </div>

            {/* --- Nút Lưu/Hủy --- */}
            <div className="d-flex flex-wrap justify-content-center w-100">
                <KLNButton
                    btnClassName="mt-4 mr-5"
                    options={KLNButtonEnum.successBtn}
                    onClick={handleAddVideo}
                >
                    Lưu
                </KLNButton>
                <KLNButton
                    btnClassName="mt-4 ml-5"
                    onClick={() => setTabView(TabViewEnum.ManageMultimediaTabVideo)}
                    urlLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}
                >
                    Hủy
                </KLNButton>
            </div>
        </div>
    );
};

export default CreateVideoForm;
