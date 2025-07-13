import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {useCallback, useEffect, useState} from "react";
import {TEST_USER_ID} from "~/utils/Constansts";
import {useAppContext} from "~/context/AppContext";
import {useAdminContext} from "~/context/AdminContext";
import {bookService} from "~/services/BookService";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {showToast} from "~/utils/Toast";
import {BROWSER_CANNOT_READ_FILE, INVALID_FILE} from "~/utils/ErrorMessage";
import {KLNButton, KLNFile, KLNFormItem, KLNPageText, KLNRenderIf, KLNUploadFile} from "~/components";
import clsx from "clsx";
import {Card} from "primereact/card";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createAudioForm.module.scss";
import {DateTimeFormat} from "~/utils";
import DateTimeFormatEnum from "~/enum/DateTime/DateTimeFormatEnum";
import InputType from "~/enum/InputType/InputType";
import AddSolidIcon from "~/assets/icon/AddSolidIcon";
import FileSolidIcon from "~/assets/icon/FileSolidIcon";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useParams} from "react-router-dom";
import MediaType from "~/enum/MediaType/MediaType";

const bookInput = {
    title: '',
    publisher: '',
    author: '',
    yearPublic: '',
    imageFile: {},
    userId: TEST_USER_ID,
    bookContent: {},
    description: '',

    downloadUrlFile: ''
}

const UpdateBookForm = () => {
    const {isLoading, setIsLoading} = useManageMagazineContext();
    const {id} = useParams();

    const [updatedBook, setUpdatedBook] = useState(bookInput);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewBook, setPreviewBook] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    const getBookData = async () => {
        const bookData = await bookService.getBookByIdService(id);
        let downloadUrlFile = (bookData.data.bookContent).replace("/upload/", "/upload/fl_attachment/")
        setUpdatedBook({
            ...updatedBook,
            ...bookData.data,
            imageFile: bookData.data.image,
            downloadUrlFile,
        });
    }

    const handleUpdateImage = useCallback(() => {
        const updateBook = async () => {
            setIsLoading(true);
            const updatedBookData = await bookService.updateBookService(id, updatedBook, MediaType.PresidentTDT);
            const status = updatedBookData.status ?? HttpStatusEnum.BadRequest;
            let severity = "error";
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created)
                severity = "success";
            showToast({
                toastRef: toast,
                severity: severity,
                summary: "Cập nhật sách",
                detail: updatedBookData?.message,
            })
            setIsLoading(false);
        }
        updateBook();
    }, [bookInput, updatedBook]);

    const handleFile = (files, fileType) => {
        const isFile = files[0].type.startsWith(fileType);
        const isSizeOk = files[0].size <= 4000 * 1024 * 1024;
        if (isFile && isSizeOk) {
            setUpdatedBook({
                ...updatedBook,
                bookContent: files[0]
            });
            setPreviewBook(files[0]);
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
                summary: 'Tải sách lỗi',
                detail: BROWSER_CANNOT_READ_FILE
            });
        }
    }

    useEffect(() => {
        getBookData();
    }, [id]);

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh bìa lên</h6>}>
                        <KLNUploadFile
                            setPreviewImage={setPreviewImage}
                            setData={setUpdatedBook}
                            data={updatedBook}
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
                                <KLNRenderIf renderIf={previewImage || updatedBook.imageFile}>
                                    <img src={previewImage ?? updatedBook.imageFile} alt="Hình ảnh xem trước"/>
                                </KLNRenderIf>
                            </div>
                            <div style={{
                                height: "40%"
                            }}
                                 className={clsx(styles["create-image__preview--image__content"], 'd-flex flex-wrap bg-light p-2')}>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-1">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Tiêu đề:</h6>
                                    <p className={clsx(styles['preview-para'])}
                                       title={updatedBook?.title}>{updatedBook?.title || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-1">
                                    <h6 style={{
                                        fontWeight: 'bold',
                                    }}>Tác giả:</h6>
                                    <p className={clsx(styles['preview-para'])}
                                       title={updatedBook?.author}>{updatedBook?.author || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-1">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Nhà xuất bản:</h6>
                                    <p className={clsx(styles['preview-para'])}
                                       title={updatedBook?.publisher}>{updatedBook?.publisher || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-1">
                                    <h6 style={{
                                        fontWeight: 'bold',
                                    }}>Năm xuất bản:</h6>
                                    <p className={clsx(styles['preview-para'])}
                                       title={updatedBook?.yearPublic}>{!isNaN(DateTimeFormat(updatedBook?.yearPublic, DateTimeFormatEnum.Year))
                                        ? DateTimeFormat(updatedBook?.yearPublic, DateTimeFormatEnum.Year) :
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
                            value={updatedBook?.title}
                            onChange={(e) => setUpdatedBook({
                                ...updatedBook,
                                title: e.target.value,
                            })}
                            placeholder="Nhập tiêu đề"
                        />
                        <KLNFormItem
                            label="Nhà xuất bản"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={updatedBook?.publisher}
                            onChange={(e) => setUpdatedBook({
                                ...updatedBook,
                                publisher: e.target.value,
                            })}
                            placeholder="Nhập tên nhà xuất bản"
                        />
                        <KLNFormItem
                            label="Tác giả"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={updatedBook?.author}
                            onChange={(e) => setUpdatedBook({
                                ...updatedBook,
                                author: e.target.value,
                            })}
                            placeholder="Nhập tên tác giả"
                        />
                        <KLNFormItem
                            label="Năm xuất bản"
                            inputType={InputType.Calendar}
                            labelClassName="w-100 mb-2 fw-bold"
                            value={updatedBook?.yearPublic ? new Date(updatedBook?.yearPublic, 0, 1) : null}
                            dateFormat="yy"
                            view="year"
                            maxDate={new Date()}
                            onChange={(e) => setUpdatedBook({
                                ...updatedBook,
                                yearPublic: DateTimeFormat(e.target.value, DateTimeFormatEnum.Year),
                            })}
                            placeholder="Nhập năm xuất bản"
                        />
                        <KLNFormItem
                            label="Mô tả"
                            inputType={InputType.TextArea}
                            labelClassName="w-100 mb-2 fw-bold"
                            rows={5}
                            value={updatedBook?.description}
                            onChange={(e) => setUpdatedBook({
                                ...updatedBook,
                                description: e.target.value,
                            })}
                            placeholder="Nhập mô tả"
                        />
                    </Card>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 p-3">
                    <h5 style={{
                        fontWeight: 'bold'
                    }}>Thêm sách</h5>
                    <Card className="w-100 card-details">
                        <div
                            style={{
                                cursor: 'pointer'
                            }} className={clsx("d-flex flex-wrap align-item-center col-lg-12 col-md-12 col-sm-12 p-2")}>
                            <label
                                htmlFor="bookUpload"
                                style={{
                                    fontWeight: 'bold'
                                }} className={clsx("w-100")}>
                                <AddSolidIcon className="" style={{
                                    marginRight: '10px',
                                }}/>
                                Tải sách lên
                                <p className='mb-0'>Kích thước tối đa 4GB với định dạng pdf, docx,...</p>
                            </label>
                            <input type="file" id="bookUpload"
                                   accept="application/*"
                                   style={{display: "none"}}
                                   onChange={handleUploadBook}/>
                            <KLNRenderIf renderIf={previewBook || updatedBook.bookContent}>
                                <KLNFile
                                    href={previewBook != null ? URL.createObjectURL(previewBook) : updatedBook.downloadUrlFile}
                                    prefixIcon={
                                        <FileSolidIcon style={{
                                            marginRight: "10px"
                                        }}/>}
                                    trailingIcon={
                                        <TrashBrokenIcon
                                            style={{
                                                marginLeft: '5px',
                                            }}
                                            onClick={() => {
                                                setUpdatedBook({
                                                    ...updatedBook,
                                                    bookContent: null
                                                })
                                                setPreviewBook(null)
                                            }}/>}
                                    fileName={previewBook?.name || updatedBook.title}
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
                        onClick={handleUpdateImage}
                    >Lưu</KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        btnClassName="mt-4 ml-5"
                        onClick={() => setTabView(TabViewEnum.ManageMagazineTabBook)}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-magazine`}
                    >Hủy</KLNButton>
                </div>
            </div>
        </>
    );
}

export default UpdateBookForm;