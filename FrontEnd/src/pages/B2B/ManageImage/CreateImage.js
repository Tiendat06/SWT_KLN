import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {
    ADD_IMAGE_TITLE,
} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";
import React from "react";
import {CreateImageForm} from "~/features/B2B/ManageMultimedia";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import mediaType from "~/enum/MediaType/MediaType";
import {KLNBreadCrumb} from "~/components";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";

const CreateImage = () => {
    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-images`}>Hình ảnh và hiện vật</Link>},
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-images`}>Danh sách hình ảnh & hiện vật</Link>},
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-images/create-images`}>Thêm hình ảnh và hiện vật</Link>}
    ];

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
            <KLNBreadCrumb items={items}/>
            <CreateImageForm mediaType={mediaType.TDTMemorial} slideShowType={SlideShowType.Artifact}/>
        </ManageMultimediaProvider>
    );
}

export default CreateImage;