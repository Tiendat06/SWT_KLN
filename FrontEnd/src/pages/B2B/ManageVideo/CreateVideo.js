import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { KLNBreadCrumb } from "~/components";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import { useAdminContext } from "~/context/AdminContext";
import { CreateVideoForm } from "~/features/B2B/ManageMultimedia"; 
import { ManageMultimediaProvider } from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import { ADD_VIDEO_TITLE } from "~/utils/Constansts"; 

const CreateVideo = () => {
    const { setTabView } = useAdminContext();

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Tài liệu đa phương tiện</Link> },
        {
            template: () => (
                <Link
                    onClick={() => setTabView(TabViewEnum.ManageMultimediaTabVideo)}
                    to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}
                >
                    Danh sách video
                </Link>
            ),
        },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia/create-video`}>Thêm video</Link> },
    ];

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{ADD_VIDEO_TITLE}</title>
            </Helmet>
            <h2 style={{ marginLeft: 15, fontWeight: "bold" }}>Thêm Video</h2>
            <KLNBreadCrumb items={items} />
            <CreateVideoForm /> 
        </ManageMultimediaProvider>
    );
};

export default CreateVideo;
