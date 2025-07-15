import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {slideShowService} from "~/services/SlideShowService";
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
import KLNDataTable from "~/components/KLNTable/KLNDataTable";

const ImageTable = ({slideShowType = SlideShowType.TDTArtistic, mediaType = MediaType.PresidentTDT}) => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [slideShowId, setSlideShowId] = useState(null);
    const {selectedPageOption, setDeleteAction} = useAdminContext();
    const {
        visible,
        setVisible,
        isLoading,
        setIsLoading,
        imageList,
        slideShow,
        dispatch,
        selectedItems,
        setSelectedItems,
        isUpdated
    } = useManageMultimediaContext();

    const handleDeleteMany = useCallback(async () => {
        // api
        setIsLoading(true);
        const deleteSlideImages = await slideShowService.deleteSlideImageInSpecificSlideShowBySlideShowIdService(selectedItems.map(item => item.id), slideShowId);
        if (deleteSlideImages)
            dispatch(deleteImageAction(selectedItems));
        setVisible(false);
        setIsLoading(false);
    }, [selectedItems, slideShowId]);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback((imageItem) => {
        setDeleteAction(true);
        dispatch(setImageAction(imageItem));
    }, []);

    useLayoutEffect(() => {
        const getSlideShow = async () => {
            setIsLoading(true);
            const data = await slideShowService.getSlideShowListService(1, 1, mediaType, slideShowType);
            const slideShowData = data?.data?.items[0];
            setSlideShowId(slideShowData?.slideShowId);
            const startIndex = (currentPage - 1) * selectedPageOption.code;
            const endIndex = startIndex + selectedPageOption.code;

            if (slideShowData?.slideImage){
                dispatch(getImagesAction(slideShowData?.slideImage));
                dispatch(getSlideShowAction({
                    ...slideShowData,
                    slideImage: slideShowData?.slideImage.slice(startIndex, endIndex),
                }));
            }

            setPageCount(Math.ceil((slideShowData?.slideImage?.length || 0) / selectedPageOption.code));
            setIsLoading(false);
        }
        getSlideShow();
    }, [currentPage, selectedPageOption, isUpdated]);

    useEffect(() => {
        paginateSlideImages(imageList);
    }, [currentPage, selectedPageOption, imageList]);

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

    const selectedOnCurrentPage = (slideShow?.slideImage || []).filter(p =>
        selectedItems.some(s => s.id === p.id));

    const handleSelectionChange = (e) => {
        const selectedOnPage = e.value;
        const remaining = selectedItems.filter(
            item => !(slideShow?.slideImage || []).some(p => p.id === item.id)
        );
        const updated = [...remaining, ...selectedOnPage];
        setSelectedItems(updated);
    };

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
                        selection={selectedOnCurrentPage}
                        onSelectionChange={handleSelectionChange}
                        dataKey="id"
                    >
                        <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                        <KLNColumn body={(rowData, {rowIndex}) =>
                            <span>{(rowIndex + 1) + ((currentPage - 1) * selectedPageOption.code)}</span>} header="#"
                                   headerStyle={{width: '3rem'}}></KLNColumn>
                        <KLNColumn headerStyle={{width: '8rem'}} bodyStyle={{width: '8rem', textAlign: 'center'}}
                                   header="Thumnails" body={imageBodyTemplate}></KLNColumn>
                        <KLNColumn field="capture" header="Nội dung"></KLNColumn>
                        <KLNColumn headerStyle={{width: 150}} bodyStyle={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }} header="Thao tác" body={(rowData) => (<KLNTableAction
                            editActionLink={`${AppRoutesEnum.AdminRoute}${
                                slideShowType === SlideShowType.TDTArtistic ? '/manage-multimedia/image/':
                                slideShowType === SlideShowType.Artifact ? '/manage-images/': ''
                            }${rowData.id}`}
                            onClickDelete={() => showModal(rowData)}
                        />)}></KLNColumn>
                    </KLNDataTable>
                </div>
                <KLNReactPaginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
                <DeleteImage slideShowId={slideShowId}/>
                <DeleteMany
                    isLoading={isLoading}
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