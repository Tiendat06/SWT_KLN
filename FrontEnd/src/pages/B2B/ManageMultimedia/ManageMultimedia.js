import { MultimediaLayouts } from "~/features/B2B/ManageMultimedia";
import { ManageMultimediaProvider } from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import { Helmet } from "react-helmet-async";
import { MULTIMEDIA_TITLE } from "~/utils/Constansts";
import { useEffect } from "react";
import { useAdminContext } from "~/context/AdminContext";
import TabViewEnum from "~/enum/TabView/TabViewEnum"; 

const ManageMultimedia = () => {
    const { setTabView } = useAdminContext();

    useEffect(() => {
        setTabView(TabViewEnum.ManageMultimediaTabImage);
    }, [setTabView]);

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{MULTIMEDIA_TITLE}</title>
            </Helmet>
            <MultimediaLayouts />
        </ManageMultimediaProvider>
    );
};

export default ManageMultimedia;
