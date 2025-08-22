import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {deleteTopicImageAction} from '~/store/B2B/ManageTopic/actions';
import {topicService} from "~/services/TopicService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import MediaType from "~/enum/MediaType/MediaType";
import { TEST_USER_ID } from "~/utils/Constansts";
import { showToast } from '~/utils/Toast';
import { useAppContext } from '~/context/AppContext';

const DeleteImageModal = ({topicId}) => {
    const {
        selectedTopicImage, selectedImages, setSelectedImages, setIsUpdated, dispatch,
        deleteImageModalVisible, setDeleteImageModalVisible, setSelectedImagesInTable
    } = useManageTopicContext();
    const { toast } = useAppContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let imageIds = [];
            
            if (selectedImages && selectedImages.length > 0) {
                imageIds = selectedImages.map(img => img.id);
            } else if (selectedTopicImage) {
                imageIds = [selectedTopicImage.id];
            }
            
            if (imageIds.length > 0) {
                await topicService.deleteTopicMediaService({
                    topicId,
                    mediaTypeId: MediaType.PresidentTDT,
                    userId: TEST_USER_ID,
                    imageIds,
                    videoIds: []
                });
                
                dispatch(deleteTopicImageAction(imageIds));
                setSelectedImages([]);
                setSelectedImagesInTable([]);
            }
            
            setIsUpdated(prev => !prev);
            setDeleteImageModalVisible(false);
            
            showToast({ 
                toastRef: toast, 
                severity: 'success', 
                summary: 'Xóa ảnh', 
                detail: imageIds.length > 1 ? `Xóa ${imageIds.length} ảnh thành công!` : 'Xóa ảnh thành công!' 
            });
        } catch (error) {
            console.error('Error deleting images:', error);
            setDeleteImageModalVisible(false);
            
            showToast({ 
                toastRef: toast, 
                severity: 'error', 
                summary: 'Lỗi xóa ảnh', 
                detail: 'Có lỗi xảy ra khi xóa ảnh. Vui lòng thử lại.' 
            });
        }
    }, [selectedTopicImage, selectedImages, dispatch, setSelectedImages, setSelectedImagesInTable, setIsUpdated, setDeleteImageModalVisible, topicId, toast]);

    const getDeleteMessage = () => {
        if (selectedImages && selectedImages.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedImages.length} ảnh đã chọn không ?`;
        } else if (selectedTopicImage) {
            return `Bạn có chắc chắn muốn xóa ảnh '${selectedTopicImage?.capture}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <>
            <KLNModal
                visible={deleteImageModalVisible}
                setVisible={setDeleteImageModalVisible}
                position={'middle'}
                labelSave='Xác nhận'
                labelCancel='Bỏ qua'
                headerStyle={{
                    padding: "5px 10px 0 10px"
                }}
                contentStyle={{
                    paddingBottom: 10
                }}
                btnSaveOnClick={onClickDeleteItem}
                btnCancelOnClick={() => setDeleteImageModalVisible(false)}
                buttonSaveOptions={KLNButtonEnum.blackBtn}
                buttonCloseOptions={KLNButtonEnum.whiteBtn}
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginLeft: 20,
                }}
            >
                <p style={{
                    fontWeight: "bold",
                    fontSize: 21,
                }} className="text-center mb-0 text-dark">
                    {getDeleteMessage()}
                </p>
            </KLNModal>
        </>
    );
};

export default DeleteImageModal; 