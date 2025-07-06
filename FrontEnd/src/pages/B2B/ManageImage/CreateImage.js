import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {
    ADD_IMAGE_TITLE,
} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";
import React from "react";
import {CreateImageForm} from "~/features/B2B/ManageMultimedia";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

const CreateImage = () => {

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>
                    {ADD_IMAGE_TITLE}
                </title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                Thêm ảnh
            </h2>
            <CreateImageForm slideShowType={SlideShowType.Artifact} />
        </ManageMultimediaProvider>
    );
}

export default CreateImage;