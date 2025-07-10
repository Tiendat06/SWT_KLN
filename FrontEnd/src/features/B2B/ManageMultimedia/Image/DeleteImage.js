import {KLNModal} from "~/components";
import React, {useCallback} from "react";
import {useAdminContext} from "~/context/AdminContext";
import {deleteImageAction} from '~/store/B2B/ManageMultimedia/actions';
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {slideShowService} from "~/services/SlideShowService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import {check_icon} from "~/assets/img";

const DeleteImage = ({slideShowId}) => {
    const {deleteAction, setDeleteAction} = useAdminContext();
    const {image, dispatch, setIsLoading, setSelectedItems} = useManageMultimediaContext();

    const onClickDeleteItem = useCallback(async () => {
        // api
        setIsLoading(true);
        const deleteSlideImages = await slideShowService.deleteSlideImageInSpecificSlideShowBySlideShowIdService([image.id], slideShowId);
        if (deleteSlideImages)
            dispatch(deleteImageAction([image]));
        setDeleteAction(false);
        setIsLoading(false);
        setSelectedItems([]);
    }, [image]);

    return (
        <>
            <KLNModal
                size="sm"
                visible={deleteAction}
                setVisible={setDeleteAction}
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
                btnCancelOnClick={() => setDeleteAction(false)}
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
                <div className="">
                    <div className="d-flex">
                        <img src={check_icon} alt=""/>
                        <p className="mb-0 text-dark" style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginLeft: 5
                        }}>
                            Bạn có chắc chắn muốn xóa không?
                        </p>
                    </div>
                    <p style={{
                        fontSize: 16,
                    }} className="mb-0 text-dark">Mục bạn chọn sẽ được xóa khỏi danh sách.</p>
                </div>
            </KLNModal>
        </>
    );
}

export default DeleteImage;