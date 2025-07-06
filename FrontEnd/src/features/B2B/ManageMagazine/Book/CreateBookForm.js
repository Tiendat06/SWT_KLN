import {useAdminContext} from "~/context/AdminContext";
import {useAppContext} from "~/context/AppContext";
import {useCallback, useState} from "react";
import HttpStatusEnum from "~/enum/Http/HttpStatusEnum";
import {showToast} from "~/utils/Toast";
import {BROWSER_CANNOT_READ_FILE, INVALID_FILE} from "~/utils/ErrorMessage";
import {Card} from "primereact/card";
import {KLNButton, KLNFormItem, KLNUploadFile} from "~/components";
import clsx from "clsx";
import styles from "~/styles/Pages/B2B/ManageMultimedia/createAudioForm.module.scss";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import AddSolidIcon from "~/assets/icon/AddSolidIcon";
import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {bookService} from "~/services/BookService";
import FileSolidIcon from "~/assets/icon/FileSolidIcon";
import {TEST_USER_ID} from "~/utils/Constansts";
import InputType from "~/enum/InputType/InputType";
import KLNPageText from "~/components/KLNPageText/KLNPageText";
import {DateTimeFormat} from "~/utils";
import DateTimeFormatEnum from "~/enum/DateTime/DateTimeFormatEnum";

const bookInput = {
    title: '',
    publisher: '',
    author: '',
    yearPublic: '',
    imageFile: {},
    userId: TEST_USER_ID,
    bookContent: {},
    description: ''
}

const CreateBookForm = () => {
    const {isLoading, setIsLoading} = useManageMagazineContext();
    const [addedBook, setAddedBook] = useState(bookInput);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewBook, setPreviewBook] = useState(null);
    const {toast} = useAppContext();
    const {setTabView} = useAdminContext();

    const handleAddImage = useCallback(() => {
        const addBook = async () => {
            setIsLoading(true);
            const addedBookData = await bookService.addBookService(addedBook);
            const status = addedBookData.status ?? 400;
            if (status === HttpStatusEnum.Ok || status === HttpStatusEnum.Created) {
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: "Thêm sách",
                    detail: "Thêm sách thành công."
                });
                setPreviewImage(null);
                setAddedBook(bookInput);
            } else
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: "Thêm sách",
                    detail: addedBookData?.message,
                })
            setIsLoading(false);
        }
        addBook();
    }, [bookInput, addedBook]);

    const handleFile = (files, fileType) => {
        const isFile = files[0].type.startsWith(fileType);
        const isSizeOk = files[0].size <= 4000 * 1024 * 1024;
        if (isFile && isSizeOk) {
            setAddedBook({
                ...addedBook,
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

    return (
        <>
            <div className="d-flex flex-wrap mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12 p-3 pt-0">
                    <Card
                        title={<h6 className="mb-0" style={{fontWeight: 'bold'}}>Tải ảnh bìa lên</h6>}>
                        <KLNUploadFile
                            setPreviewImage={setPreviewImage}
                            setData={setAddedBook}
                            data={addedBook}
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
                            }}
                                 className={clsx(styles["create-image__preview--image__content"], 'd-flex flex-wrap bg-light')}>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Tiêu đề:</h6>
                                    <p title={addedBook?.title}>{addedBook?.title || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <h6 style={{
                                        fontWeight: 'bold',
                                    }}>Tác giả:</h6>
                                    <p title={addedBook?.author}>{addedBook?.author || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <h6 style={{
                                        fontWeight: 'bold'
                                    }}>Nhà xuất bản:</h6>
                                    <p title={addedBook?.publisher}>{addedBook?.publisher || <KLNPageText/>}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <h6 style={{
                                        fontWeight: 'bold',
                                    }}>Năm xuất bản:</h6>
                                    <p title={addedBook?.yearPublic}>{!isNaN(DateTimeFormat(addedBook?.yearPublic, DateTimeFormatEnum.Year))
                                        ? DateTimeFormat(addedBook?.yearPublic, DateTimeFormatEnum.Year) :
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
                            value={addedBook?.title}
                            onChange={(e) => setAddedBook({
                                ...addedBook,
                                title: e.target.value,
                            })}
                            placeholder="Nhập tiêu đề"
                        />
                        <KLNFormItem
                            label="Nhà xuất bản"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedBook?.publisher}
                            onChange={(e) => setAddedBook({
                                ...addedBook,
                                publisher: e.target.value,
                            })}
                            placeholder="Nhập tên nhà xuất bản"
                        />
                        <KLNFormItem
                            label="Tác giả"
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedBook?.author}
                            onChange={(e) => setAddedBook({
                                ...addedBook,
                                author: e.target.value,
                            })}
                            placeholder="Nhập tên tác giả"
                        />
                        <KLNFormItem
                            label="Năm xuất bản"
                            inputType={InputType.Calendar}
                            labelClassName="w-100 mb-2 fw-bold"
                            value={addedBook?.yearPublic}
                            dateFormat="yy"
                            view="year"
                            maxDate={new Date()}
                            onChange={(e) => setAddedBook({
                                ...addedBook,
                                yearPublic: e.target.value,
                            })}
                            placeholder="Nhập năm xuất bản"
                        />
                        <KLNFormItem
                            label="Mô tả"
                            inputType={InputType.TextArea}
                            labelClassName="w-100 mb-2 fw-bold"
                            rows={5}
                            value={addedBook?.description}
                            onChange={(e) => setAddedBook({
                                ...addedBook,
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
                                htmlFor="audioUpload"
                                style={{
                                    fontWeight: 'bold'
                                }} className={clsx("w-100")}>
                                <AddSolidIcon className="" style={{
                                    marginRight: '10px',
                                }}/>
                                Tải sách lên
                                <p className='mb-0'>Kích thước tối đa 4GB với định dạng pdf, docx,...</p>
                            </label>
                            <input type="file" id="audioUpload"
                                   accept="application/*"
                                   style={{display: "none"}}
                                   onChange={handleUploadBook}/>
                            {previewBook && (
                                <div className={clsx("mt-2 d-flex align-items-center", styles['preview-audio'])}>
                                    <FileSolidIcon width={30} height={30} style={{
                                        marginRight: "10px"
                                    }}/>
                                    <span style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>{previewBook.name}</span>
                                    <TrashBrokenIcon
                                        style={{
                                            marginLeft: '5px',
                                        }}
                                        onClick={() => setPreviewBook(null)}
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
                        onClick={() => setTabView(TabViewEnum.ManageMagazineTabBook)}
                        urlLink={`${AppRoutesEnum.AdminRoute}/manage-magazine`}
                    >Hủy</KLNButton>
                </div>
            </div>
        </>
    );
}

export default CreateBookForm;