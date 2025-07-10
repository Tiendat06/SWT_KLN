import React, { useState } from "react";
import { KLNButton, KLNBreadCrumb } from "~/components";
import { InputText } from "primereact/inputtext";
import { faPlus, faTrash, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const KLNTopicForm = ({
    // Props cho form data
    formData,
    onFormDataChange,
    isFormValid,
    
    // Props cho breadcrumb và tiêu đề
    pageTitle,
    breadcrumbItems,
    
    // Props cho images
    images = [],
    onAddImage,
    onDeleteImages,
    selectedImages = [],
    onImageSelection,
    
    // Props cho videos  
    videos = [],
    onAddVideo,
    onDeleteVideos,
    selectedVideos = [],
    onVideoSelection,
    
    // Props cho nút hành động
    submitButtonText = "Lưu",
    isSubmitting = false,
    onSubmit,
    onCancel,
    
    // Props cho loading state
    loading = false,
    
    // Props tùy chọn
    className = "",
    style = {}
}) => {
    
    const handleInputChange = (field, value) => {
        onFormDataChange && onFormDataChange(field, value);
    };

    const renderMediaSection = (
        title, 
        icon, 
        iconClass, 
        mediaList, 
        selectedItems, 
        onAdd, 
        onDelete, 
        onSelection,
        isImageType = true
    ) => (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 font-weight-bold d-flex align-items-center gap-2" style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon={icon} className={iconClass} />
                    {title}
                </h6>
                <div className="d-flex gap-2">
                    <KLNButton
                        options={KLNButtonEnum.dangerBtn}
                        icon={faPlus}
                        onClick={onAdd}
                        style={{ 
                            fontSize: '16px', 
                            padding: '6px 12px', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontWeight: '500', 
                            boxShadow: '0 2px 4px rgba(173, 30, 50, 0.2)' 
                        }}
                        iconStyle={{ marginLeft: '6px', fontSize: '12px' }}
                    >
                        Thêm
                    </KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.secondDangerBtn}
                        icon={faTrash}
                        onClick={onDelete}
                        disabled={selectedItems.length === 0}
                        style={{ 
                            fontSize: '16px', 
                            padding: '6px 12px', 
                            borderRadius: '6px', 
                            fontWeight: '500' 
                        }}
                        iconStyle={{ marginLeft: '6px', fontSize: '12px' }}
                    >
                        Xóa
                    </KLNButton>
                </div>
            </div>
            <div className="border rounded p-3" style={{ minHeight: '100px', maxHeight: '150px', overflowY: 'auto' }}>
                {mediaList.length > 0 ? (
                    <div className="row">
                        {mediaList.map((item) => (
                            <div key={item.id} className="col-12 mb-2">
                                <div className="d-flex align-items-center gap-2 p-2 border rounded">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={e => onSelection(item.id, e.target.checked)}
                                    />
                                    {isImageType ? (
                                        <img
                                            src={item.imageLink || item.preview || '/placeholder-image.jpg'}
                                            alt={item.capture}
                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                            className="rounded"
                                        />
                                    ) : (
                                        <div 
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                backgroundColor: '#f0f0f0',
                                                marginLeft: '20px'
                                            }} 
                                            className="rounded d-flex align-items-center justify-content-center"
                                        >
                                            📹
                                        </div>
                                    )}
                                    <span className="text-truncate" title={item.capture}>
                                        {item.capture}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted py-3">
                        {isImageType ? 'Chưa có ảnh nào.' : 'Chưa có video nào.'} Nhấn "Thêm" để thêm {isImageType ? 'ảnh' : 'video'}.
                    </div>
                )}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
                <span>Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <div className={`container py-4 ${className}`} style={style}>
            <h2 style={{ marginLeft: 15, fontWeight: "bold", fontSize: "24px" }}>
                {pageTitle}
            </h2>
            <KLNBreadCrumb items={breadcrumbItems} />
            
            <div className="p-4">
                {/* Form input tên chuyên đề */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ fontSize: "16px" }}>
                        Tên chuyên đề *
                    </label>
                    <InputText
                        value={formData.capture || ''}
                        onChange={e => handleInputChange('capture', e.target.value)}
                        placeholder="Nhập nội dung..."
                        className="w-100"
                        style={{ fontSize: "15px" }}
                    />
                </div>

                {/* Section quản lý ảnh */}
                {renderMediaSection(
                    "Ảnh",
                    faImage,
                    "text-primary",
                    images,
                    selectedImages,
                    onAddImage,
                    onDeleteImages,
                    onImageSelection,
                    true
                )}

                {/* Section quản lý video */}
                {renderMediaSection(
                    "Video", 
                    faVideo,
                    "text-danger",
                    videos,
                    selectedVideos,
                    onAddVideo,
                    onDeleteVideos,
                    onVideoSelection,
                    false
                )}

                {/* Nút hành động */}
                <div className="d-flex gap-3 justify-content-center">
                    <KLNButton
                        isLoading={isSubmitting}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={onSubmit}
                        disabled={!isFormValid || isSubmitting}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >
                        {submitButtonText}
                    </KLNButton>
                    <KLNButton
                        options={KLNButtonEnum.whiteBtn}
                        urlLink="#"
                        onClick={onCancel}
                        style={{ fontSize: '16px', padding: '8px 20px' }}
                    >
                        Hủy
                    </KLNButton>
                </div>
            </div>
        </div>
    );
};

export default KLNTopicForm; 