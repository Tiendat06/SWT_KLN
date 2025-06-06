import {KLNBreadCrumb} from "~/components";
import React from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {useAdminContext} from "~/context/AdminContext";
import {CreateImageForm} from "~/features/B2B/ManageMultimedia";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {Helmet} from "react-helmet-async";
import {ADD_MULTIMEDIA_IMAGE_TITLE} from "~/utils/Constansts";

const CreateMultimediaImage = () => {
    const {setTabView} = useAdminContext();

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Tài liệu đa phương tiện</Link> },
        { template: () => <Link onClick={() => setTabView(TabViewEnum.ManageMultimediaTabImage)}
                                to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách ảnh</Link> },
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia/create-image`}>Thêm ảnh</Link> },
    ];

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{ADD_MULTIMEDIA_IMAGE_TITLE}</title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                Thêm Ảnh
            </h2>
            <KLNBreadCrumb items={items} />
            <CreateImageForm />
        </ManageMultimediaProvider>
    )
}

export default CreateMultimediaImage;