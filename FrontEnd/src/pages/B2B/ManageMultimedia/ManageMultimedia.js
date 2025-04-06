import {MultimediaLayouts} from "~/features/B2B/ManageMultimedia";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";

const ManageMultimedia = () => {

    return (
        <ManageMultimediaProvider>
            <MultimediaLayouts />
        </ManageMultimediaProvider>
    )
}

export default ManageMultimedia;