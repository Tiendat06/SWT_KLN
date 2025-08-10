import {useAdminContext} from "~/context/AdminContext";
import {Link, useParams} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import React from "react";
import {Helmet} from "react-helmet-async";
import {
    UPDATE_MULTIMEDIA_AUDIO_TITLE,
    UPDATE_MULTIMEDIA_IMAGE_TITLE, UPDATE_MULTIMEDIA_VIDEO_TITLE
} from "~/utils/Constansts";
import {KLNBreadCrumb} from "~/components";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {ManageMultimediaProvider} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {UpdateImageForm} from "~/features/B2B/ManageMultimedia";

const UpdateMultimedia = () => {
    const {tabView, setTabView} = useAdminContext();
    const {id} = useParams();

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
                <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia/${id}`}>
                    {tabView === TabViewEnum.ManageMultimediaTabImage ? 'Chỉnh sửa ảnh' :
                        tabView === TabViewEnum.ManageMultimediaTabVideo ? 'Chỉnh sửa video' :
                            tabView === TabViewEnum.ManageMultimediaTabAudio ? 'Chỉnh sửa nhạc' :
                                ''
                    }
                </Link>
        }
    ];

    return (
        <ManageMultimediaProvider>
            <Helmet>
                <title>
                    {tabView === TabViewEnum.ManageMultimediaTabImage ? UPDATE_MULTIMEDIA_IMAGE_TITLE
                        : tabView === TabViewEnum.ManageMultimediaTabVideo ? UPDATE_MULTIMEDIA_VIDEO_TITLE
                            : tabView === TabViewEnum.ManageMultimediaTabAudio ? UPDATE_MULTIMEDIA_AUDIO_TITLE
                                : ''
                    }
                </title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {tabView === TabViewEnum.ManageMultimediaTabImage ? 'Chỉnh sửa Ảnh'
                    : tabView === TabViewEnum.ManageMultimediaTabVideo ? 'Chỉnh sửa Video'
                        : tabView === TabViewEnum.ManageMultimediaTabAudio ? 'Chỉnh sửa nhạc'
                            : ''
                }
            </h2>
            <KLNBreadCrumb items={items}/>
            {tabView === TabViewEnum.ManageMultimediaTabImage ?
                <UpdateImageForm id={id} mediaType={MediaType.PresidentTDT} slideShowType={SlideShowType.TDTArtistic} />
                : tabView === TabViewEnum.ManageMultimediaTabVideo ? <></>
                    : tabView === TabViewEnum.ManageMultimediaTabAudio ? <></>
                        : <></>
            }
        </ManageMultimediaProvider>
    );
}

export default UpdateMultimedia;