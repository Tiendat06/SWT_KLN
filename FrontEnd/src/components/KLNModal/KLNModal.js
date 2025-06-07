import {Dialog} from 'primereact/dialog';
import {memo} from "react";
import {KLNButton} from "~/components";

const KLNModal = ({
                      visible = false,
                      setVisible = () => {
                      },
                      position = 'center',
                      children = '',
                      labelCancel = 'Cancel',
                      labelSave = 'Save',
                      modalHeader = '',
                      footerStyle = {},
                      buttonSaveStyle = {},
                      buttonCancelStyle = {},
                      btnSaveOnClick = () => {
                      },
                      btnCancelOnClick = () => {
                      },
                      ...props
                  }) => {

    const footerContent = (
        <div style={footerStyle}>
            <KLNButton style={buttonSaveStyle} onClick={btnSaveOnClick}>
                {labelSave}
            </KLNButton>
            <KLNButton style={buttonCancelStyle} onClick={btnCancelOnClick}>
                {labelCancel}
            </KLNButton>
        </div>
    );

    return (
        <>
            <Dialog {...props} header={modalHeader} visible={visible} position={position} style={{width: '50vw'}} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }} footer={footerContent} draggable={false} resizable={false}>
                {children}
            </Dialog>
        </>
    );
}

export default memo(KLNModal);