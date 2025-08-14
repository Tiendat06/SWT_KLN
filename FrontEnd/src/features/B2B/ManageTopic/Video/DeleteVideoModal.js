import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {deleteTopicVideoAction} from '~/store/B2B/ManageTopic/actions';
import {topicService} from "~/services/TopicService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import MediaType from "~/enum/MediaType/MediaType";
import { TEST_USER_ID } from "~/utils/Constansts";

const DeleteVideoModal = ({topicId}) => {
    const {
        selectedTopicVideo, selectedVideos, setSelectedVideos, setIsUpdated, dispatch,
        deleteVideoModalVisible, setDeleteVideoModalVisible
    } = useManageTopicContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let videoIds = [];
            
            if (selectedVideos && selectedVideos.length > 0) {
                videoIds = selectedVideos.map(video => video.id);
            } else if (selectedTopicVideo) {
                videoIds = [selectedTopicVideo.id];
            }
            
            if (videoIds.length > 0) {
                await topicService.deleteTopicMediaService({
                    topicId,
                    mediaTypeId: MediaType.None,
                    userId: TEST_USER_ID,
                    imageIds: [],
                    videoIds
                });
                
                dispatch(deleteTopicVideoAction(videoIds));
                setSelectedVideos([]);
            }
            
            setIsUpdated(prev => !prev);
            setDeleteVideoModalVisible(false);
        } catch (error) {
            console.error('Error deleting videos:', error);
            setDeleteVideoModalVisible(false);
        }
    }, [selectedTopicVideo, selectedVideos, dispatch, setSelectedVideos, setIsUpdated, setDeleteVideoModalVisible, topicId]);

    const getDeleteMessage = () => {
        if (selectedVideos && selectedVideos.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedVideos.length} video đã chọn không ?`;
        } else if (selectedTopicVideo) {
            return `Bạn có chắc chắn muốn xóa video '${selectedTopicVideo?.capture}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <>
            <KLNModal
                visible={deleteVideoModalVisible}
                setVisible={setDeleteVideoModalVisible}
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
                btnCancelOnClick={() => setDeleteVideoModalVisible(false)}
                buttonSaveOptions={KLNButtonEnum.blackBtn}
                buttonCloseOptions={KLNButtonEnum.whiteBtn}
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                buttonSaveStyle={{
                    marginRight: 20,
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

export default DeleteVideoModal; 