import {KLNDataTable, KLNColumn, KLNReactPaginate, KLNTableActionModal} from "~/components";
import {useEffect, useState, useCallback} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {DateTimeFormat} from "~/utils/DateTimeFormat";
import {
    getTopicImagesAction,
    setTopicImageAction,
    setTopicImagesLoadingAction
} from '~/store/B2B/ManageTopic/actions';

const TopicImageTable = ({topicDetail}) => {
    const {selectedPageOption} = useAdminContext();
    const {
        selectedImagesInTable, setSelectedImagesInTable, setEditingImage, setEditImageModalVisible,
        topicImages, isTopicImagesLoading, dispatch, setSelectedImages, setDeleteImageModalVisible
    } = useManageTopicContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    // Paginate images when data changes
    const paginateImages = useCallback((imagesData) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        const endIndex = startIndex + selectedPageOption.code;
        const paginatedData = imagesData.slice(startIndex, endIndex);
        // Also update store
        dispatch(getTopicImagesAction(paginatedData));
    }, [currentPage, selectedPageOption.code, dispatch]);

    useEffect(() => {
        if (topicDetail?.images) {
            dispatch(setTopicImagesLoadingAction(true));
            
            const allImagesData = topicDetail.images;
            setPageCount(Math.ceil(allImagesData.length / selectedPageOption.code));
            
            // Paginate images
            paginateImages(allImagesData);
            
            dispatch(setTopicImagesLoadingAction(false));
        }
    }, [topicDetail, selectedPageOption.code, paginateImages, dispatch]);

    // Handle page changes
    const handlePageClick = useCallback((event) => {
        setCurrentPage(event.selected + 1);
    }, []);

    // Reset to page 1 when page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedPageOption.code]);

    const onSelectionChange = (selection) => {
        setSelectedImagesInTable(selection);
    };

    const onEditImage = (image) => {
        dispatch(setTopicImageAction(image));
        setEditingImage(image);
        setEditImageModalVisible(true);
    };

    const onDeleteImage = (image) => {
        dispatch(setTopicImageAction(image));
        setSelectedImages([image]);
        setDeleteImageModalVisible(true);
    };

    const thumbnailBodyTemplate = (rowData) => {
        return (
            <img 
                src={rowData.imageLink} 
                alt={rowData.capture}
                style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px'}}
            />
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <KLNTableActionModal
                onEdit={() => onEditImage(rowData)}
                onClickDelete={() => onDeleteImage(rowData)}
            />
        );
    };

    const sequenceBodyTemplate = (rowData, options) => {
        const startIndex = (currentPage - 1) * selectedPageOption.code;
        return startIndex + options.rowIndex + 1;
    };

    return (
        <>
            <div style={{borderRadius: 10}} className="card overflow-hidden mb-3">
                <KLNDataTable
                    value={topicImages}
                    loading={isTopicImagesLoading}
                    loadingIcon={<i className="pi pi-spin pi-spinner" style={{fontSize: '2rem', color: '#3f51b5'}}/>}
                    selection={selectedImagesInTable}
                    onSelectionChange={(e) => onSelectionChange(e.value)}
                    dataKey="id"
                >
                    <KLNColumn selectionMode="multiple" headerStyle={{width: '3rem'}}></KLNColumn>
                    <KLNColumn 
                        field="sequence" 
                        header="STT" 
                        body={sequenceBodyTemplate}
                        style={{width: '60px', textAlign: 'center'}}
                    />
                    <KLNColumn 
                        field="thumbnail" 
                        header="Thumbnail" 
                        body={thumbnailBodyTemplate}
                        style={{width: '120px'}}
                    />
                    <KLNColumn 
                        field="capture" 
                        header="Nội dung"
                        style={{minWidth: '250px'}}
                    />
                    <KLNColumn 
                        field="actions" 
                        header="Action"
                        body={actionBodyTemplate}
                        headerStyle={{width: 150}} 
                        bodyStyle={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}
                    />
                </KLNDataTable>
            </div>
            
            {/* KLN Pagination - hiển thị luôn cả khi chỉ có 1 trang */}
            <KLNReactPaginate
                pageCount={Math.max(pageCount, 1)}
                handlePageClick={handlePageClick}
            />
        </>
    );
};

export default TopicImageTable; 