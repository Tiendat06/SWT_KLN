import {KLNTabView} from "~/components";
import React, {useEffect} from "react";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {useAdminContext} from "~/context/AdminContext";
import ImageTable from "~/features/B2B/ManageMultimedia/ImageTable";
import VideoTable from "~/features/B2B/ManageMultimedia/VideoTable";
import AudioTable from "~/features/B2B/ManageMultimedia/AudioTable";
import KLNCascadeSelect from "../../../components/KLNCascadeSelect/KLNCascadeSelect";
import clsx from "clsx";

const ManageMultimedia = () => {
    const {tabView, setTabView} = useAdminContext();
    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.ManageMultimediaTabImage);
    }, [tabView]);

    const tabViewData = [
        {id: 1, tabView: TabViewEnum.ManageMultimediaTabImage, title: 'Ảnh', count: 1},
        {id: 2, tabView: TabViewEnum.ManageMultimediaTabVideo, title: 'Video', count: 1},
        {id: 3, tabView: TabViewEnum.ManageMultimediaTabAudio, title: 'Nhạc', count: 1},
    ];

    return (
        <>
            <KLNTabView
                data={tabViewData}
            />
            <div style={{
                paddingLeft: 32
            }} className="">
                <div className={clsx('mt-4 mb-4 d-flex align-items-center')}>
                    <p style={{
                        marginRight: 15,
                        marginBottom: 0
                    }}>Số luợng hiển thị</p>
                    <KLNCascadeSelect />
                </div>
                {tabView === TabViewEnum.ManageMultimediaTabImage && (
                    <ImageTable />
                )}
                {tabView === TabViewEnum.ManageMultimediaTabVideo && (
                    <VideoTable />
                )}
                {tabView === TabViewEnum.ManageMultimediaTabAudio && (
                    <AudioTable />
                )}
            </div>
        </>
    )
}

export default ManageMultimedia;