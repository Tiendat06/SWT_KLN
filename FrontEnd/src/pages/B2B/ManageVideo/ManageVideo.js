import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAdminContext } from "~/context/AdminContext";
import { MultimediaLayouts } from "~/features/B2B/ManageMultimedia";
import { ManageMultimediaProvider } from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import { MANAGE_VIDEO_TITLE } from "~/utils/Constansts";
import TabViewEnum from "~/enum/TabView/TabViewEnum";

const ManageVideo = () => {
    const { setTabView } = useAdminContext();

    useEffect(() => {
        setTabView(TabViewEnum.ManageMultimediaTabVideo);
    }, [setTabView]);

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{MANAGE_VIDEO_TITLE}</title>
            </Helmet>
            <MultimediaLayouts />
        </ManageMultimediaProvider>
    );
};

export default ManageVideo;
