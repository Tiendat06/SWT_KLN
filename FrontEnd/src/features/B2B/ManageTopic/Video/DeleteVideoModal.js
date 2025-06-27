import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {deleteTopicVideoAction} from '~/store/B2B/ManageTopic/actions';
import {topicService} from "~/services/TopicService";

const DeleteVideoModal = ({topicId}) => {
    const {
        selectedTopicVideo, selectedVideos, setSelectedVideos, setIsUpdated, dispatch,
        deleteVideoModalVisible, setDeleteVideoModalVisible
    } = useManageTopicContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let videoIds = [];
            
            // Nếu có selectedVideos (multiple delete)
            if (selectedVideos && selectedVideos.length > 0) {
                videoIds = selectedVideos.map(video => video.id);
            } 
            // Nếu có selectedTopicVideo (single delete)
            else if (selectedTopicVideo) {
                videoIds = [selectedTopicVideo.id];
            }
            
            if (videoIds.length > 0) {
                // Gọi API xóa nhiều
                if (videoIds.length === 1) {
                    await topicService.deleteTopicVideoService(topicId, videoIds[0]);
                } else {
                    await topicService.deleteTopicVideosService(topicId, videoIds);
                }
                
                // Dispatch action để cập nhật store
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
                position={'top'}
                labelSave='Xóa'
                labelCancel='Hủy'
                btnSaveOnClick={onClickDeleteItem}
                btnCancelOnClick={() => setDeleteVideoModalVisible(false)}
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