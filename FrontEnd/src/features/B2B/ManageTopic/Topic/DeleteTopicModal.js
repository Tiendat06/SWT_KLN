import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {deleteTopicAction} from '~/store/B2B/ManageTopic/actions';
import {topicService} from "~/services/TopicService";

const DeleteTopicModal = ({visible, setVisible, btnSaveOnClick, btnCancelOnClick}) => {
    const {selectedTopic, selectedTopics, setSelectedTopics, setIsUpdated, dispatch} = useManageTopicContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let topicIds = [];
            
            // Nếu có selectedTopics (multiple delete)
            if (selectedTopics && selectedTopics.length > 0) {
                topicIds = selectedTopics.map(topic => topic.topicId);
            } 
            // Nếu có selectedTopic (single delete)
            else if (selectedTopic) {
                topicIds = [selectedTopic.topicId];
            }
            
            if (topicIds.length > 0) {
                // Gọi API xóa nhiều topic
                await topicService.deleteTopicService(topicIds);
                
                // Dispatch action để cập nhật store
                dispatch(deleteTopicAction(topicIds));
                setSelectedTopics([]);
            }
            
            setIsUpdated(prev => !prev);
            setVisible(false);
        } catch (error) {
            console.error('Error deleting topics:', error);
            setVisible(false);
        }
    }, [selectedTopic, selectedTopics, dispatch, setSelectedTopics, setIsUpdated, setVisible]);

    const getDeleteMessage = () => {
        if (selectedTopics && selectedTopics.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedTopics.length} chuyên đề đã chọn không ?`;
        } else if (selectedTopic) {
            return `Bạn có chắc chắn muốn xóa chuyên đề '${selectedTopic?.capture}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <>
            <KLNModal
                visible={visible}
                setVisible={setVisible}
                position={'top'}
                labelSave='Xóa'
                labelCancel='Hủy'
                btnSaveOnClick={btnSaveOnClick || onClickDeleteItem}
                btnCancelOnClick={btnCancelOnClick || (() => setVisible(false))}
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

export default DeleteTopicModal; 