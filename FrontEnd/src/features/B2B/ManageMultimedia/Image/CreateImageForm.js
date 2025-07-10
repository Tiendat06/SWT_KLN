import React, {useCallback, useEffect, useState} from "react";
import {Card} from 'primereact/card';
import clsx from "clsx";
import styles from '~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss';
import {KLNButton, KLNUploadFile} from "~/components";
import {useAppContext} from "~/context/AppContext";
import {showToast} from "~/utils/Toast";
import {INVALID_FILE} from "~/utils/ErrorMessage";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {useAdminContext} from "~/context/AdminContext";
import {slideShowService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import KLNFormItem from "~/components/KLNFormItem/KLNFormItem";
import InputType from "~/enum/InputType/InputType";

const CreateImageForm = ({slideShowType = SlideShowType.TDTArtistic, mediaType = MediaType.PresidentTDT}) => {
    const {isLoading, setIsLoading} = useManageMultimediaContext();
    const [addedSlideImage, setAddedSlideImage] = useState({
        slideShowId: null,
        imageFile: {},
        description: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    useEffect(() => {
        const getSlideShow = async () => {
            setIsLoading(true);
            const data = await slideShowService.getSlideShowListService(1, 1, mediaType, slideShowType);
            const slideShowData = data?.data?.items[0];
            console.log(slideShowData);
            setAddedSlideImage({
                ...addedSlideImage,
                slideShowId: slideShowData.slideShowId,
            })
            setIsLoading(false);
        }
        getSlideShow();
    }, []);

    const handleAddImage = useCallback(() => {
        const addSlideImage = async () => {
            setIsLoading(true);
            const addedSlideImageData = await slideShowService.addSlideImageInSpecificSlideShowService(addedSlideImage, mediaType, slideShowType);
            const status = addedSlideImageData.status;
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created) {
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: "Thêm hình ảnh",
                    detail: "Thêm hình ảnh thành công."
                });
                setPreviewImage(null);
                setAddedSlideImage({
                    slideShowId: null,
                    imageFile: {},
                    description: '',
                });
            } else
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: "Thêm hình ảnh",
                    detail: addedSlideImageData?.message,
                })
            setIsLoading(false);
        }
        addSlideImage();
    }, [addedSlideImage]);

    const onChangeDescription = (e) => {
        setAddedSlideImage({
            ...addedSlideImage,
            description: e.target.value,
        });
    }

    const handleManyFile = (files) => {
        const isImage = files[0].type.startsWith("image/");
        const isSizeOk = files[0].size <= 100 * 1024 * 1024;
        if (isImage && isSizeOk) {
            setAddedSlideImage({
                ...addedSlideImage,
                imageFile: files[0]
            });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải hình ảnh lỗi',
                detail: INVALID_FILE
            });
        }

        //// many files
        // const validFiles = [];
        // Array.from(files).forEach((file) => {
        //     const isImage = file.type.startsWith("image/");
        //     const isSizeOk = file.size <= 100 * 1024 * 1024;
        //
        //     if (isImage && isSizeOk) {
        //         validFiles.push(file);
        //     } else {
        //         showToast({
        //             toastRef: toast,
        //             severity: 'error',
        //             summary: 'Tải hình ảnh lỗi',
        //             detail: INVALID_FILE
        //         });
        //     }
        //     if (validFiles.length > 0)
        //         setImageFiles(validFiles);
        // });
    };

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh lên</h6>}>
                        <KLNUploadFile
                            setPreviewImage={setPreviewImage}
                            setData={setAddedSlideImage}
                            data={addedSlideImage}
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
                                }}>Nội dung:</h6>
                                <p title={addedSlideImage?.description}>{addedSlideImage?.description}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thông tin chi tiết</h5>
                    <Card className="w-100 card-details">
                        <KLNFormItem
                            parentClassName={"col-lg-8 col-md-8 col-sm-12 p-3"}
                            label="Tiêu đề"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedSlideImage.description}
                            onChange={onChangeDescription}
                            placeholder="Nhập nội dung" rows={5} cols={30}
                            inputType={InputType.TextArea}
                        />
                        <KLNFormItem
                            parentClassName={"col-lg-4 col-md-4 col-sm-12 p-3"}
                            label="Tiêu đề"
                            labelClassName="w-100 mb-2 fw-bold"
                            disabled={true} id="calendar"
                            value={new Date()} dateFormat="dd/mm/yy"
                            showIcon
                            inputType={InputType.Calendar}
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
                        onClick={() => setTabView(TabViewEnum.ManageMultimediaTabImage)}
                        urlLink={slideShowType === SlideShowType.TDTArtistic ? `${AppRoutesEnum.AdminRoute}/manage-multimedia` :
                            slideShowType === SlideShowType.Artifact ? `${AppRoutesEnum.AdminRoute}/manage-images` : ''
                        }
                    >Hủy</KLNButton>
                </div>
            </div>
        </>
    )
}

export default CreateImageForm;