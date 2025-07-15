import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import React, {memo} from "react";
import clsx from "clsx";
import InputType from "~/enum/InputType/InputType";
import {Calendar} from "primereact/calendar";
import {KLNRenderIf} from "~/components";

const KLNFormItem = ({
                         parentClassName = "col-lg-12 col-md-12 col-sm-12 p-2",
                         label = '',
                         labelClassName = '',
                         inputClassName = '',
                         inputType = InputType.Text,
                         ...props
                     }) => {

    return (
        <div className={clsx(parentClassName)}>
            <label style={{
                fontWeight: 'bold'
            }} className={clsx("w-100 mb-2", labelClassName)}>{label}</label>
            <KLNRenderIf renderIf={inputType === InputType.Text}>
                <InputText
                    {...props}
                    className={clsx("w-100", inputClassName)}/>
            </KLNRenderIf>
            <KLNRenderIf renderIf={inputType === InputType.TextArea}>
                <InputTextarea
                    {...props}
                    className={clsx("w-100", inputClassName)}/>
            </KLNRenderIf>
            <KLNRenderIf renderIf={inputType === InputType.Calendar}>
                <Calendar
                    {...props}
                    className={clsx("w-100", inputClassName)}/>
            </KLNRenderIf>
            <KLNRenderIf renderIf={inputType === InputType.SingleSelect}>
                <></>
            </KLNRenderIf>
            <KLNRenderIf renderIf={inputType === InputType.Checkbox}>
                <></>
            </KLNRenderIf>
        </div>
    );
}

export default memo(KLNFormItem);