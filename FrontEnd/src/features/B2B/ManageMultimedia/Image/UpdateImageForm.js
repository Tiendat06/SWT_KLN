import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {KLNButton, KLNFormItem, KLNUploadFile} from "~/components";
import InputType from "~/enum/InputType/InputType";
import {Card} from "primereact/card";
import clsx from "clsx";
import styles from '~/styles/Pages/B2B/ManageMultimedia/createImage.module.scss';
import {showToast} from "~/utils/Toast";
import {useCallback, useEffect, useState} from "react";
import {slideShowService} from "~/services/SlideShowService";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {useAppContext} from "~/context/AppContext";
import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import MediaType from "~/enum/MediaType/MediaType";
import {setImageAction} from "~/store/B2B/ManageMultimedia/actions";
import {setSlideshowAction} from "~/store/B2B/ManageSlideShow/actions";

const UpdateImageForm
    = ({
           id,
           slideShowType = SlideShowType.TDTArtistic,
           mediaType = MediaType.PresidentTDT
       }) => {
    const {
        isLoading, setIsLoading,
        dispatch, image, slideShow
    } = useManageMultimediaContext();
    const [previewImage, setPreviewImage] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    useEffect(() => {
        const getSlideImage = async () => {
            setIsLoading(true);
            const data = await slideShowService.getSlideShowListService(1, 1, mediaType, slideShowType);
            const slideShowData = data?.data?.items[0];

            const slideImage = await slideShowService.getSlideImageByIdService(id, slideShowData.slideShowId);
            const slideImageData = slideImage?.data;

            // dispatch(setSlideshowAction(slideShowData))
            dispatch(setImageAction({
                ...slideImageData,
                slideShowId: slideShowData?.slideShowId
            }))
            setPreviewImage(slideImageData?.imageLink);
            setIsLoading(false);
        }
        getSlideImage();
    }, []);

    const handleUpdateImage = useCallback(() => {
        const updateSlideImage = async () => {
            setIsLoading(true);
            const updatedSlideImageData = await slideShowService.updateSlideshowImageService(
                slideShow.slideShowId, image.id, image);
            const status = updatedSlideImageData.status;
            let severity = 'error';
            if (status === HttpStatusEnum.Ok)
                severity = 'success';

            showToast({
                toastRef: toast,
                severity: severity,
                summary: "Chỉnh sửa hình ảnh",
                detail: updatedSlideImageData?.message,
            })
            setIsLoading(false);
        }
        updateSlideImage();
    }, [image, slideShow]);

    console.log(image)

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh lên</h6>}>
                        <KLNUploadFile
                            setPreviewImage={setPreviewImage}
                            setData={setImageAction}
                            data={image}
                            dispatch={dispatch}
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
                                <p title={image?.capture}>{image?.capture}</p>
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
                            value={image?.capture}
                            onChange={(e) => dispatch(setImageAction({
                                ...image,
                                capture: e.target.value
                            }))}
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
                        onClick={handleUpdateImage}
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

export default UpdateImageForm;