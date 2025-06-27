import {Dialog} from 'primereact/dialog';
import {memo} from "react";
import {KLNButton} from "~/components";

const TopicModal = ({
    visible = false,
    onHide = () => {},
    position = 'center',
    children = '',
    labelCancel = 'Hủy',
    labelSave = 'Lưu',
    header = '',
    style = {width: '50vw'},
    footerStyle = {},
    buttonSaveStyle = {},
    buttonCancelStyle = {},
    btnSaveOnClick = () => {},
    btnCancelOnClick = () => {},
    disabled = false,
    ...props
}) => {

    const footerContent = (
        <div className="d-flex justify-content-center gap-3" style={{padding: '1rem', ...footerStyle}}>
            <KLNButton 
                options={5}
                onClick={btnSaveOnClick}
                disabled={disabled}
                style={{
                    minWidth: '100px',
                    ...buttonSaveStyle
                }}
            >
                {labelSave}
            </KLNButton>
            <KLNButton 
                options={4}
                onClick={btnCancelOnClick}
                style={{
                    minWidth: '100px',
                    ...buttonCancelStyle
                }}
            >
                {labelCancel}
            </KLNButton>
        </div>
    );

    return (
        <Dialog 
            {...props} 
            header={header} 
            visible={visible} 
            position={position} 
            style={style}
            onHide={onHide} 
            footer={footerContent} 
            draggable={false} 
            resizable={false}
            className="topic-modal"
        >
            {children}
        </Dialog>
    );
};

export default memo(TopicModal); 