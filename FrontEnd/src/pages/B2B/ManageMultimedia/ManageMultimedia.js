import {MultimediaLayouts} from "~/features/B2B/ManageMultimedia";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {Helmet} from "react-helmet-async";
import {MULTIMEDIA_TITLE} from "~/utils/Constansts";

const ManageMultimedia = () => {

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{MULTIMEDIA_TITLE}</title>
            </Helmet>
            <MultimediaLayouts />
        </ManageMultimediaProvider>
    )
}

export default ManageMultimedia;