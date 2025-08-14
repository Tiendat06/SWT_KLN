import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {deleteTopicImageAction} from '~/store/B2B/ManageTopic/actions';
import {topicService} from "~/services/TopicService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import MediaType from "~/enum/MediaType/MediaType";
import { TEST_USER_ID } from "~/utils/Constansts";

const DeleteImageModal = ({topicId}) => {
    const {
        selectedTopicImage, selectedImages, setSelectedImages, setIsUpdated, dispatch,
        deleteImageModalVisible, setDeleteImageModalVisible
    } = useManageTopicContext();

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
                    mediaTypeId: MediaType.None,
                    userId: TEST_USER_ID,
                    imageIds,
                    videoIds: []
                });
                
                dispatch(deleteTopicImageAction(imageIds));
                setSelectedImages([]);
            }
            
            setIsUpdated(prev => !prev);
            setDeleteImageModalVisible(false);
        } catch (error) {
            console.error('Error deleting images:', error);
            setDeleteImageModalVisible(false);
        }
    }, [selectedTopicImage, selectedImages, dispatch, setSelectedImages, setIsUpdated, setDeleteImageModalVisible, topicId]);

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