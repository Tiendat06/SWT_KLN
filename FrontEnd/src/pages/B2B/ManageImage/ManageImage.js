import {Helmet} from "react-helmet-async";
import {IMAGE_TITLE} from "~/utils/Constansts";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {ImageLayout} from "~/features/B2B/ManageImage";

const ManageImage = () => {

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>{IMAGE_TITLE}</title>
            </Helmet>
            <ImageLayout />
        </ManageMultimediaProvider>
    )
}

export default ManageImage;