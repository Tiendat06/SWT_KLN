import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { KLNButton } from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const KLNCollapsibleMediaSection = ({
    title,
    icon,
    iconColor = "text-primary",
    mediaList = [],
    selectedItems = [],
    onAdd,
    onDelete,
    onItemSelection,
    renderItem,
    emptyMessage = "Chưa có dữ liệu. Nhấn 'Thêm' để thêm mới.",
    isCollapsed = false,
    addButtonText = "Thêm",
    deleteButtonText = "Xóa",
    addButtonOptions = KLNButtonEnum.dangerBtn,
    deleteButtonOptions = KLNButtonEnum.secondDangerBtn,
    maxHeight = "150px",
    minHeight = "100px"
}) => {
    const [collapsed, setCollapsed] = useState(isCollapsed);



    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const defaultRenderItem = (item) => (
        <div key={item.id} className="col-12 mb-2">
            <div className="d-flex align-items-center gap-2 p-2 border rounded">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={e => onItemSelection(item.id, e.target.checked)}
                />
                {item.imageLink ? (
                    <img
                        src={item.imageLink || item.preview || '/placeholder-image.jpg'}
                        alt={item.capture}
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        className="rounded"
                    />
                ) : (
                    <div 
                        style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0' }} 
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
    );

    return (
        <div className="mb-4">
            {/* Header với nút thu gọn */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div 
                    className="d-flex align-items-center gap-2 cursor-pointer"
                    onClick={handleToggleCollapse}
                    style={{ cursor: 'pointer' }}
                >
                    <h6 className="mb-0 font-weight-bold d-flex align-items-center gap-2" style={{ fontSize: "16px" }}>
                        <FontAwesomeIcon icon={icon} className={iconColor} />
                        {title} ({mediaList.length})
                        <FontAwesomeIcon 
                            icon={collapsed ? faChevronDown : faChevronUp} 
                            style={{ fontSize: '12px', marginLeft: '8px' }}
                            className="text-muted"
                        />
                    </h6>
                </div>
                
                {/* Nút hành động */}
                <div className="d-flex gap-2">
                    <KLNButton
                        options={addButtonOptions}
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
                        {addButtonText}
                    </KLNButton>
                    <KLNButton
                        options={deleteButtonOptions}
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
                        {deleteButtonText}
                    </KLNButton>
                </div>
            </div>

            {/* Nội dung có thể thu gọn */}
            {!collapsed && (
                <div 
                    className="border rounded p-3" 
                    style={{ 
                        minHeight: minHeight, 
                        maxHeight: maxHeight, 
                        overflowY: 'auto',
                        transition: 'all 0.3s ease-in-out'
                    }}
                >
                    {mediaList.length > 0 ? (
                        <div className="row">
                            {mediaList.map(item => 
                                renderItem ? renderItem(item) : defaultRenderItem(item)
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-muted py-3">
                            {emptyMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KLNCollapsibleMediaSection; 