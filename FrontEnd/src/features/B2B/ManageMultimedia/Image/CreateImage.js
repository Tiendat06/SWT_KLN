import {KLNModal} from "~/components";
import React, {useState} from "react";

const CreateImage = ({
                         form = ''
                     }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <KLNModal
                visible={visible}
                setVisible={setVisible}
                position={'top'}
            >
                <p>Hi world</p>
            </KLNModal>
        </>
    )
}

export default CreateImage;