import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {useCallback, useState} from "react";
import {useAppContext} from "~/context/AppContext";
import {useAdminContext} from "~/context/AdminContext";
import {magazineService} from "~/services/MagazineService";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {showToast} from "~/utils/Toast";
import {BROWSER_CANNOT_READ_FILE, INVALID_FILE} from "~/utils/ErrorMessage";
import {KLNButton, KLNFile, KLNFormItem, KLNPageText, KLNRenderIf, KLNUploadFile} from "~/components";
import {Card} from "primereact/card";
import clsx from "clsx";
import InputType from "~/enum/InputType/InputType";
import AddSolidIcon from "~/assets/icon/AddSolidIcon";
import FileSolidIcon from "~/assets/icon/FileSolidIcon";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createAudioForm.module.scss";
import {TEST_USER_ID} from "~/utils/Constansts";
import MediaType from "~/enum/MediaType/MediaType";

const magazineInput = {
    title: '',
    imageFile: {},
    magazineContent: {},
    description: '',
    userId: TEST_USER_ID,
}

const CreateMagazineForm = () => {
    const {isLoading, setIsLoading} = useManageMagazineContext();
    const [addedMagazine, setAddedMagazine] = useState(magazineInput);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewMagazine, setPreviewMagazine] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    const handleAddImage = useCallback(() => {
        const addMagazine = async () => {
            setIsLoading(true);
            const addedBookData = await magazineService.addMagazineService(addedMagazine, MediaType.PresidentTDT);
            const status = addedBookData.status ?? HttpStatusEnum.BadRequest;
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created) {
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: "Thêm báo & tạp chí",
                    detail: "Thêm báo & tạp chí thành công."
                });
                setPreviewImage(null);
                setAddedMagazine(magazineInput);
            } else
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: "Thêm báo & tạp chí",
                    detail: addedBookData?.message,
                })
            setIsLoading(false);
        }
        addMagazine();
    }, [magazineInput, addedMagazine]);

    const handleFile = (files, fileType) => {
        const isFile = files[0].type.startsWith(fileType);
        const isSizeOk = files[0].size <= 4000 * 1024 * 1024;
        if (isFile && isSizeOk) {
            setAddedMagazine({
                ...addedMagazine,
                magazineContent: files[0]
            });
            setPreviewMagazine(files[0]);
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải file lỗi',
                detail: INVALID_FILE
            });
        }
    };

    const handleUploadBook = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files, "application/");
        } else {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Tải báo & tạp chí lỗi',
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
                            setData={setAddedMagazine}
                            data={addedMagazine}
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
                                <KLNRenderIf renderIf={previewImage}>
                                    <img src={previewImage} alt="Hình ảnh xem trước"/>
                                </KLNRenderIf>
                            </div>
                            <div style={{
                                height: "40%"
                            }}
                                 className={clsx(styles["create-image__preview--image__content"], 'd-flex flex-wrap bg-light')}>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Tiêu đề:</h6>
                                    <p title={addedMagazine?.title}>{addedMagazine?.title || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Mô tả:</h6>
                                    <p title={addedMagazine?.description}>{addedMagazine?.description ||
                                        <KLNPageText/>}</p>
                                </div>
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
                            value={addedMagazine?.title}
                            onChange={(e) => setAddedMagazine({
                                ...addedMagazine,
                                title: e.target.value,
                            })}
                            placeholder="Nhập tiêu đề"
                        />
                        <KLNFormItem
                            label="Mô tả"
                            inputType={InputType.TextArea}
                            labelClassName="w-100 mb-2 fw-bold"
                            rows={5}
                            value={addedMagazine?.description}
                            onChange={(e) => setAddedMagazine({
                                ...addedMagazine,
                                description: e.target.value,
                            })}
                            placeholder="Nhập mô tả"
                        />
                    </Card>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thêm báo & tạp chí</h5>
                    <Card className="w-100 card-details">
                        <div
                            style={{
                                cursor: 'pointer'
                            }} className={clsx("d-flex flex-wrap align-item-center col-lg-12 col-md-12 col-sm-12 p-2")}>
                            <label
                                htmlFor="magazineUpload"
                                style={{
                                    fontWeight: 'bold'
                                }} className={clsx("w-100")}>
                                <AddSolidIcon className="" style={{
                                    marginRight: '10px',
                                }}/>
                                Tải báo & tạp chí lên
                                <p className='mb-0'>Kích thước tối đa 4GB với định dạng pdf, docx,...</p>
                            </label>
                            <input type="file" id="magazineUpload"
                                   accept="application/*"
                                   style={{display: "none"}}
                                   onChange={handleUploadBook}/>
                            <KLNRenderIf renderIf={previewMagazine}>
                                <KLNFile
                                    href={previewMagazine ? URL.createObjectURL(previewMagazine) : ''}
                                    prefixIcon={<FileSolidIcon style={{
                                        marginRight: "10px"
                                    }}/>}
                                    trailingIcon={<TrashBrokenIcon
                                        style={{
                                            marginLeft: '5px',
                                        }}
                                        onClick={() => setPreviewMagazine(null)}/>}
                                    fileName={previewMagazine?.name}
                                />
                            </KLNRenderIf>
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
                        onClick={() => setTabView(TabViewEnum.ManageMagazineTabMagazine)}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-magazine`}
                    >Hủy</KLNButton>
                </div>
            </div>
        </>
    );
}

export default CreateMagazineForm;