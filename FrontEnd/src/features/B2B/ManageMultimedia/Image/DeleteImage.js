import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {deleteImageAction} from '~/store/B2B/ManageMultimedia/actions';
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {slideShowService} from "~/services/SlideShowService";

const DeleteImage = ({slideShowId}) => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {image, dispatch, isLoading, setIsLoading} = useManageMultimediaContext();

    const onClickDeleteItem = useCallback(async () => {
        // api
        setIsLoading(true);
        const deleteSlideImages = await slideShowService.deleteSlideImageInSpecificSlideShowBySlideShowIdService([image.id], slideShowId);
        if (deleteSlideImages)
            dispatch(deleteImageAction([image]));
        setDeleteAction(false);
        setIsLoading(false);
    }, [image]);

    return (
        <>
            <KLNModal
                isLoading={isLoading}
                visible={deleteAction}
                setVisible={setDeleteAction}
                position={'top'}
                labelSave='Delete'
                labelCancel='Cancel'
                btnSaveOnClick={onClickDeleteItem}
                btnCancelOnClick={() => setDeleteAction(false)}
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
                }} className="text-center mb-0 text-dark">Bạn có chắc chắn muốn xóa hình '{image?.capture}' không ?</p>
            </KLNModal>
        </>
    );
}

export default DeleteImage;