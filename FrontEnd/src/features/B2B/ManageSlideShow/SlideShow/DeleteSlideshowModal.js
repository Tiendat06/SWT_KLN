import React, {useCallback} from 'react';
import { KLNModal } from '~/components';
import { useManageSlideshowContext } from '~/context/B2B/ManageSlideShow/ManageSlideshowContext';
import { useAppContext } from "~/context/AppContext";
import { showToast } from "~/utils/Toast";
import KLNButtonEnum from '~/enum/Button/KLNButtonEnum';

const DeleteSlideShowModal = ({visible, setVisible, btnSaveOnClick, btnCancelOnClick, onDelete}) => {
    const {selectedSlideshow, selectedSlideshows} = useManageSlideshowContext();
    const { toast } = useAppContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let slideshowIds = [];
            
            if (selectedSlideshows && selectedSlideshows.length > 0) {
                slideshowIds = selectedSlideshows.map(slideshow => slideshow.slideShowId);
            } 
            else if (selectedSlideshow) {
                slideshowIds = [selectedSlideshow.slideShowId];
            }
            
            if (slideshowIds.length > 0 && onDelete) {
                await onDelete(slideshowIds);
            }
        } catch (error) {
            console.error('Error deleting slideshows:', error);
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa danh mục', detail: 'Có lỗi xảy ra khi xóa danh mục' });
            setVisible(false);
        }
    }, [selectedSlideshow, selectedSlideshows, onDelete, setVisible, toast]);

    const getDeleteMessage = () => {
        if (selectedSlideshows && selectedSlideshows.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedSlideshows.length} danh mục đã chọn không ?`;
        } else if (selectedSlideshow) {
            return `Bạn có chắc chắn muốn xóa danh mục '${selectedSlideshow?.title}' đã chọn không ?`;
        }
        return 'Bạn có chắc chắn muốn xóa không ?';
    };

    return (
        <KLNModal
            visible={visible}
            setVisible={setVisible}
            position={'middle'}
            labelSave='Xác nhận'
            labelCancel='Bỏ qua'
            headerStyle={{ padding: '5px 10px 0 10px' }}
            contentStyle={{ paddingBottom: 10 }}
            btnSaveOnClick={onClickDeleteItem}
            btnCancelOnClick={() => setVisible(false)}
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

export default DeleteSlideShowModal; 