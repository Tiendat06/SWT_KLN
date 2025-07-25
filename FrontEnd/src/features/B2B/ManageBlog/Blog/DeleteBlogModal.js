import { KLNModal } from "~/components";
import React, { useCallback } from "react";
import { useManageBlogContext } from "~/context/B2B/ManageBlog/ManageBlogContext";
import { showToast } from "~/utils/Toast";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import { useAppContext } from "~/context/AppContext";

const DeleteBlogModal = ({ visible, setVisible, btnSaveOnClick, btnCancelOnClick, onDelete }) => {
    const { selectedBlogs } = useManageBlogContext();
    const { toast } = useAppContext();

    const onClickDeleteItem = useCallback(async () => {
        try {
            let blogIds = [];
            if (selectedBlogs && selectedBlogs.length > 0) {
                blogIds = selectedBlogs.map(blog => blog.blogId || blog);
            }
            if (blogIds.length > 0 && onDelete) {
                await onDelete(blogIds);
            }
        } catch (error) {
            showToast({ toastRef: toast, severity: 'error', summary: 'Xóa blog', detail: 'Có lỗi xảy ra khi xóa blog' });
            setVisible(false);
        }
    }, [selectedBlogs, onDelete, setVisible]);

    const getDeleteMessage = () => {
        if (selectedBlogs && selectedBlogs.length > 1) {
            return `Bạn có chắc chắn muốn xóa ${selectedBlogs.length} blog đã chọn không ?`;
        } else if (selectedBlogs && selectedBlogs.length === 1) {
            return `Bạn có chắc chắn muốn xóa blog '${selectedBlogs[0]?.blogTitle || ''}' đã chọn không ?`;
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

export default DeleteBlogModal; 