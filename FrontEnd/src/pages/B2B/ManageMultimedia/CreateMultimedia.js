import {KLNBreadCrumb} from "~/components";
import React from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {useAdminContext} from "~/context/AdminContext";
import {CreateAudioForm, CreateImageForm, CreateVideoForm} from "~/features/B2B/ManageMultimedia";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {Helmet} from "react-helmet-async";
import {ADD_MULTIMEDIA_AUDIO_TITLE, ADD_MULTIMEDIA_IMAGE_TITLE, ADD_MULTIMEDIA_VIDEO_TITLE} from "~/utils/Constansts";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";

const CreateMultimedia = () => {
    const {tabView, setTabView} = useAdminContext();

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Tài liệu đa phương tiện</Link>},
        {
            template: () =>
                tabView === TabViewEnum.ManageMultimediaTabImage ?
                    <Link onClick={() => setTabView(TabViewEnum.ManageMultimediaTabImage)}
                          to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách ảnh</Link>
                    : tabView === TabViewEnum.ManageMultimediaTabVideo ?
                        <Link onClick={() => setTabView(TabViewEnum.ManageMultimediaTabVideo)}
                              to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách video</Link>
                        : tabView === TabViewEnum.ManageMultimediaTabAudio ?
                            <Link onClick={() => setTabView(TabViewEnum.ManageMultimediaTabAudio)}
                                  to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách nhạc</Link>
                            : ''
        },
        {
            template: () =>
                <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia/create-multimedia`}>
                    {tabView === TabViewEnum.ManageMultimediaTabImage ? 'Thêm ảnh' :
                        tabView === TabViewEnum.ManageMultimediaTabVideo ? 'Thêm video' :
                            tabView === TabViewEnum.ManageMultimediaTabAudio ? 'Thêm nhạc' :
                                ''
                    }
                </Link>
        }
    ];

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>
                    {tabView === TabViewEnum.ManageMultimediaTabImage ? ADD_MULTIMEDIA_IMAGE_TITLE
                        : tabView === TabViewEnum.ManageMultimediaTabVideo ? ADD_MULTIMEDIA_VIDEO_TITLE
                            : tabView === TabViewEnum.ManageMultimediaTabAudio ? ADD_MULTIMEDIA_AUDIO_TITLE
                                : ''
                    }
                </title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {tabView === TabViewEnum.ManageMultimediaTabImage ? 'Thêm Ảnh'
                    : tabView === TabViewEnum.ManageMultimediaTabVideo ? 'Thêm Video'
                        : tabView === TabViewEnum.ManageMultimediaTabAudio ? 'Thêm nhạc'
                            : ''
                }
            </h2>
            <KLNBreadCrumb items={items}/>
            {tabView === TabViewEnum.ManageMultimediaTabImage ? <CreateImageForm slideShowType={SlideShowType.TDTArtistic}/>
                : tabView === TabViewEnum.ManageMultimediaTabVideo ? <CreateVideoForm/>
                    : tabView === TabViewEnum.ManageMultimediaTabAudio ? <CreateAudioForm/>
                        : <></>
            }
        </ManageMultimediaProvider>
    )
}

export default CreateMultimedia;