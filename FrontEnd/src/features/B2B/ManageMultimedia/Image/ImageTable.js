import {useCallback, useEffect, useState} from "react";
import {deleteSlideImageInSpecificSlideShowService, getSlideShowListService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {KLNColumn, KLNReactPaginate, KLNTableAction} from "~/components";
import {useAdminContext} from "~/context/AdminContext";
import DeleteImage from "~/features/B2B/ManageMultimedia/Image/DeleteImage";
import {
    getImagesAction,
    setImageAction,
    getSlideShowAction,
    deleteImageAction
} from '~/store/B2B/ManageMultimedia/actions';
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {DeleteMany} from "~/features/B2B/ManageMultimedia";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import KLNDataTable from "../../../../components/KLNTable/KLNDataTable";

const ImageTable = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const {selectedPageOption, setDeleteAction} = useAdminContext();
    const {
        visible,
        setVisible,
        isLoading,
        setIsLoading,
        imageList,
        slideShow,
        isUpdated,
        dispatch
    } = useManageMultimediaContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        const deleteSlideImages = await deleteSlideImageInSpecificSlideShowService(selectedItems, MediaType.PresidentTDT, SlideShowType.TDTArtistic);
        if (deleteSlideImages)
            dispatch(deleteImageAction(selectedItems));
        setVisible(false);
    }, [selectedItems]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback((imageItem) => {
        setDeleteAction(true);
        dispatch(setImageAction(imageItem));
    }, []);

    useEffect(() => {
        const getSlideShow = async () => {
            setIsLoading(true);
            const data = await getSlideShowListService(1, 1, MediaType.PresidentTDT, SlideShowType.TDTArtistic);
            const slideShowData = data?.data?.items[0];
            const startIndex = (currentPage - 1) * selectedPageOption.code;
            const endIndex = startIndex + selectedPageOption.code;

            dispatch(getImagesAction(slideShowData?.slideImage));
            dispatch(getSlideShowAction({
                ...slideShowData,
                slideImage: slideShowData?.slideImage.slice(startIndex, endIndex),
            }));
            setPageCount(Math.ceil((slideShowData?.slideImage?.length || 0) / selectedPageOption.code));
            setIsLoading(false);
        }
        getSlideShow();
    }, [selectedPageOption, isUpdated]);

    useEffect(() => {
        paginateSlideImages(imageList);
    }, [currentPage, selectedPageOption]);

    const paginateSlideImages = (images) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        dispatch(getSlideShowAction({
            ...slideShow,
            slideImage: images.slice(startIndex, endIndex),
        }));
    };

    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    const imageBodyTemplate = (slideImage) => {
        return <img
            style={{
                width: 50,
            }}
            src={slideImage.imageLink}
            alt={slideImage.capture}
            className="w-6rem shadow-2 border-round"/>;
    };

    const indexTemplate = (rowData, {rowIndex}) => {
        return <span>{rowIndex + 1}</span>;
    }

    return (
        <>
            <div className="">
                <div style={{
                    borderRadius: 10
                }} className="card overflow-hidden mb-5">
                    <KLNDataTable
                        loading={isLoading}
                        value={slideShow?.slideImage}
                        tableStyle={{minWidth: '60rem'}}
                        selectionMode="multiple"
                        selection={selectedItems}
                        loadingIcon={<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#3f51b5' }} />}
                        onSelectionChange={(e) => setSelectedItems(e.value)}
                    >
                        <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                        <KLNColumn body={indexTemplate} header="#" headerStyle={{width: '3rem'}}></KLNColumn>
                        <KLNColumn headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}}
                                header="Thumnails" body={imageBodyTemplate}></KLNColumn>
                        <KLNColumn field="capture" header="Nội dung"></KLNColumn>
                        <KLNColumn headerStyle={{width: '10rem'}} bodyStyle={{
                            width: '10rem',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }} header="Thao tác" body={(rowData) => (<KLNTableAction
                            editActionLink={`${AppRoutesEnum.AdminRoute}/manage-multimedia/image/${rowData.id}`}
                            onClickDelete={() => showModal(rowData)}
                        />)}></KLNColumn>
                    </KLNDataTable>
                </div>
                <KLNReactPaginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
                <DeleteImage/>
                <DeleteMany
                    visible={visible}
                    setVisible={setVisible}
                    btnSaveOnClick={handleDeleteMany}
                    btnCancelOnClick={hideModal}
                />
            </div>
        </>
    );
}

export default ImageTable;