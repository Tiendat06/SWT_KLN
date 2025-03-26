import {useCallback, useEffect, useState} from "react";
import {getSlideShowListService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import styles from '~/styles/Pages/B2B/MediaDocument/manageImage.module.scss';
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {KLNReactPaginate} from "~/components";
import {useAdminContext} from "~/context/AdminContext";

const ImageTable = () => {
    const [fullSlideImages, setFullSlideImages] = useState([]); // Lưu toàn bộ dữ liệu slideImage
    const [slideShow, setSlideShow] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    const {
        selectedPageOption
    } = useAdminContext();

    useEffect(() => {
        const getSlideShow = async () => {
            const data = await getSlideShowListService(1, 1, MediaType.PresidentTDT, SlideShowType.TDTArtistic);
            const slideShowData = data?.data?.items[0];
            setFullSlideImages(slideShowData?.slideImage);
            setPageCount(Math.ceil((slideShowData?.slideImage?.length || 0) / selectedPageOption.code));
            setSlideShow(slideShowData);
            paginateSlideImages(slideShowData?.slideImage || []);
        }
        getSlideShow();
    }, [selectedPageOption]);

    useEffect(() => {
        paginateSlideImages(fullSlideImages);
    }, [currentPage, selectedPageOption, fullSlideImages]);

    const paginateSlideImages = (images) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        setSlideShow({
            ...slideShow,
            slideImage: images.slice(startIndex, endIndex),
        });
    };

    const handlePageClick = useCallback( (event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (slideImage) => {
        return <img
            style={{
                width: 50,
            }}
            src={slideImage.imageLink}
            alt={slideImage.capture}
            className="w-6rem shadow-2 border-round" />;
    };

    const actionTemplate = () => {
        return (
            <>
                <div className={clsx(styles['action-trash'])}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
                <div className={clsx(styles['action-edit'])}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
            </>
        )
    }

    return (
        <>
            <div style={{
                borderRadius: 10
            }} className="card overflow-hidden mb-5">
                <DataTable
                    value={slideShow?.slideImage}
                    tableStyle={{ minWidth: '60rem' }}
                    selectionMode="multiple"
                    selection={selectedItems}
                    onSelectionChange={(e) => setSelectedItems(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}} header="Thumnails" body={imageBodyTemplate}></Column>
                    <Column field="capture" header="Nội dung"></Column>
                    <Column headerStyle={{width: '10rem'}} bodyStyle={{
                        width: '10rem',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} header="Thao tác" body={actionTemplate}></Column>
                </DataTable>
            </div>
            <KLNReactPaginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
        </>
    );
}

export default ImageTable;