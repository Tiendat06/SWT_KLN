import {Dialog} from 'primereact/dialog';
import {memo} from "react";
import {KLNButton} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";

const KLNModal = ({
                      visible = false,
                      size = 'md',
                      setVisible = () => {
                      },
                      position = 'center',
                      children = '',
                      labelCancel = 'Cancel',
                      labelSave = 'Save',
                      modalHeader = '',
                      modalHeaderStyle = {},
                      footerStyle = {},
                      buttonSaveStyle = {},
                      buttonCancelStyle = {},
                      btnSaveOnClick = () => {
                      },
                      btnCancelOnClick = () => {
                      },
                      isLoading = false,
                      buttonSaveOptions = KLNButtonEnum.dangerBtn,
                      buttonCloseOptions = KLNButtonEnum.dangerBtn,
                      ...props
                  }) => {

    const footerContent = (
        <div style={footerStyle}>
            <KLNButton options={buttonCloseOptions} style={buttonCancelStyle} onClick={btnCancelOnClick}>
                {labelCancel}
            </KLNButton>
            <KLNButton options={buttonSaveOptions} isLoading={isLoading} style={buttonSaveStyle}
                       onClick={btnSaveOnClick}>
                {labelSave}
            </KLNButton>
        </div>
    );

    const dialogSize = {
        'sm': '30vw',
        'md': '50vw',
        'lg': '70vw',
        'xl': '90vw',
    }[size] || '50vw';

    return (
        <>
            <Dialog {...props}
                    header={modalHeader}
                    visible={visible}
                    position={position}
                    style={{width: dialogSize, ...props.style}}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }}
                    footer={footerContent}
                    draggable={false}
                    resizable={false}
            >
                {children}
            </Dialog>
        </>
    );
}

export default memo(KLNModal);