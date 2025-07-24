import React, {useCallback} from 'react';
import { KLNModal } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import {deleteSlideshowImageAction, setSlideshowDetailAction} from '~/store/B2B/ManageSlideShow/actions';
import {slideShowService} from "~/services/SlideShowService";
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';

const DeleteImageModal = ({slideshowId}) => {
    const {
        selectedSlideshowImage, selectedImages, setSelectedImages, setIsUpdated, dispatch,
        deleteImageModalVisible, setDeleteImageModalVisible, slideshowDetail
    } = useManageSlideshowContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let imageIds = [];
            
            // Nếu có selectedImages (multiple delete)
            if (selectedImages && selectedImages.length > 0) {
                imageIds = selectedImages.map(img => img.id);
            } 
            // Nếu có selectedSlideshowImage (single delete)
            else if (selectedSlideshowImage) {
                imageIds = [selectedSlideshowImage.id];
            }
            
            if (imageIds.length > 0) {
                // Gọi API xóa nhiều
                if (imageIds.length === 1) {
                    await slideShowService.deleteSlideshowImageService(slideshowId, imageIds[0]);
                } else {
                    await slideShowService.deleteSlideshowImagesService(slideshowId, imageIds);
                }
                
                // Dispatch action để cập nhật store
                dispatch(deleteSlideshowImageAction(imageIds));
                
                // Cập nhật slideshowDetail để trigger re-pagination
                if (slideshowDetail) {
                    const updatedDetail = {
                        ...slideshowDetail,
                        slideImage: slideshowDetail.slideImage.filter(img => !imageIds.includes(img.id))
                    };
                    dispatch(setSlideshowDetailAction(updatedDetail));
                }
                
                setSelectedImages([]);
            }
            
            setIsUpdated(prev => !prev);
            setDeleteImageModalVisible(false);
        } catch (error) {
            console.error('Error deleting images:', error);
            setDeleteImageModalVisible(false);
        }
    }, [selectedSlideshowImage, selectedImages, dispatch, setSelectedImages, setIsUpdated, setDeleteImageModalVisible, slideshowId, slideshowDetail]);

    const getDeleteMessage = () => {
        if (selectedImages && selectedImages.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedImages.length} ảnh đã chọn không ?`;
        } else if (selectedSlideshowImage) {
            return `Bạn có chắc chắn muốn xóa ảnh '${selectedSlideshowImage?.capture}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <KLNModal
            visible={deleteImageModalVisible}
            setVisible={setDeleteImageModalVisible}
            position={'middle'}
            labelSave='Xác nhận'
            labelCancel='Bỏ qua'
            headerStyle={{ padding: '5px 10px 0 10px' }}
            contentStyle={{ paddingBottom: 10 }}
            btnSaveOnClick={onClickDeleteItem}
            btnCancelOnClick={() => setDeleteImageModalVisible(false)}
            buttonSaveOptions={KLNButtonEnum.blackBtn}
            buttonCloseOptions={KLNButtonEnum.whiteBtn}
            footerStyle={{ display: 'flex', justifyContent: 'center' }}
            buttonSaveStyle={{ marginLeft: 20 }}
        >
            <p style={{ fontWeight: 'bold', fontSize: 21 }} className="text-center mb-0 text-dark">
                {getDeleteMessage()}
            </p>
        </KLNModal>
    );
};

export default DeleteImageModal; 