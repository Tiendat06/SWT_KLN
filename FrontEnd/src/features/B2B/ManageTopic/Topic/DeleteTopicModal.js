import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useManageTopicContext} from "~/context/B2B/ManageTopic/ManageTopicContext";
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const DeleteTopicModal = ({visible, setVisible, btnSaveOnClick, btnCancelOnClick, onDelete}) => {
    const {selectedTopic, selectedTopics} = useManageTopicContext();
    const { toast } = useAppContext();

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
            
            if (topicIds.length > 0 && onDelete) {
                await onDelete(topicIds);
            }
        } catch (error) {
            console.error('Error deleting topics:', error);
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa chuyên đề', detail: 'Có lỗi xảy ra khi xóa chuyên đề' });
            setVisible(false);
        }
    }, [selectedTopic, selectedTopics, onDelete, setVisible, toast]);

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
                position={'middle'}
                labelSave='Xác nhận'
                labelCancel='Bỏ qua'
                headerStyle={{
                    padding: "5px 10px 0 10px"
                }}
                contentStyle={{
                    paddingBottom: 10
                }}
                btnSaveOnClick={btnSaveOnClick || onClickDeleteItem}
                btnCancelOnClick={btnCancelOnClick || (() => setVisible(false))}
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

export default DeleteTopicModal; 