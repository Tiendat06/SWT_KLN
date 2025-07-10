import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {KLNBreadCrumb, KLNButton, KLNTabView, KLNCascadeSelect, KLNAdminTitle} from "~/components";
import clsx from "clsx";
import {ImageTable, AudioTable, VideoTable} from '~/features/B2B/ManageMultimedia';
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {slideShowService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {musicService} from "~/services/MusicService";
import {videoService} from "~/services/VideoService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import AddBrokenIcon from "~/assets/icon/AddBrokenIcon";

const MultimediaLayouts = () => {
    const {tabView, setTabView, setDeleteAction, setSelectedPageOption} = useAdminContext();
    const [tabViewData, setTabViewData] = useState([]);
    const {
        setVisible, isUpdated, setSelectedItems, selectedItems
    } = useManageMultimediaContext();

    const showModal = useCallback(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.ManageMultimediaTabImage);
    }, [tabView]);

    useEffect(() => {
        const getTotalCount = async () => {
            const totalSlideImageData = await slideShowService.getTotalSlideImageInSpecificSlideShowService(MediaType.PresidentTDT, SlideShowType.TDTArtistic)
            const totalMusicData = await musicService.getTotalMusicService(MediaType.PresidentTDT);
            const totalVideoData = await videoService.getTotalVideoService(MediaType.PresidentTDT);

            setTabViewData([
                {
                    id: 1,
                    tabView: TabViewEnum.ManageMultimediaTabImage,
                    title: 'Ảnh',
                    totalCount: totalSlideImageData.data?.totalSlideImage
                },
                {
                    id: 2,
                    tabView: TabViewEnum.ManageMultimediaTabVideo,
                    title: 'Video',
                    totalCount: totalMusicData.data?.totalMusic
                },
                {
                    id: 3,
                    tabView: TabViewEnum.ManageMultimediaTabAudio,
                    title: 'Nhạc',
                    totalCount: totalVideoData.data?.totalVideo
                },
            ]);
        }
        getTotalCount();
    }, [isUpdated]);

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Tài liệu đa phương tiện</Link>},
        {
            template: () => {
                return (
                    <>
                        {tabView === TabViewEnum.ManageMultimediaTabImage && (
                            <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách ảnh</Link>
                        )}
                        {tabView === TabViewEnum.ManageMultimediaTabVideo && (
                            <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách video</Link>
                        )}
                        {tabView === TabViewEnum.ManageMultimediaTabAudio && (
                            <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Danh sách nhạc</Link>
                        )}
                    </>
                )
            }
        },
    ];

    return (
        <>
            <KLNAdminTitle>
                {tabView === TabViewEnum.ManageMultimediaTabImage && (
                    <>Danh sách ảnh</>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabVideo && (
                    <>Danh sách video</>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabAudio && (
                    <>Danh sách nhạc</>
                )}
            </KLNAdminTitle>
            <KLNBreadCrumb items={items}/>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <KLNTabView
                    onClickTabView={() => {
                        setDeleteAction(false);
                        setSelectedItems([]);
                        setSelectedPageOption({name: "5", code: 5});
                    }}
                    data={tabViewData}
                />
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "bold",
                            cursor: !selectedItems.length ? "not-allowed": "pointer"
                        }}
                        disabled={!selectedItems.length}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={showModal}
                    >Xóa ({selectedItems.length}) <TrashBrokenIcon width={20} height={20} style={{marginLeft: 2}}/>
                    </KLNButton>
                    <KLNButton
                        urlLink={
                            `${AppRoutesEnum.AdminRoute}/manage-multimedia/create-multimedia`
                            // tabView === TabViewEnum.ManageMultimediaTabImage
                            //     ? `${AppRoutesEnum.AdminRoute}/manage-multimedia/create-image`
                            //     : tabView === TabViewEnum.ManageMultimediaTabVideo
                            //         ? `${AppRoutesEnum.AdminRoute}/manage-multimedia/create-video`
                            //         : tabView === TabViewEnum.ManageMultimediaTabAudio
                            //             ? `${AppRoutesEnum.AdminRoute}/manage-multimedia/create-audio`
                            //             : ''
                        }
                        options={KLNButtonEnum.dangerBtn}
                    >Thêm <AddBrokenIcon width={20} height={20} style={{marginLeft: 5}}/></KLNButton>
                </div>
            </div>
            <div style={{
                paddingLeft: 32
            }} className="">
                <div className={clsx('mt-4 mb-4 d-flex align-items-center')}>
                    <p style={{
                        marginRight: 15,
                        marginBottom: 0
                    }}>Số luợng hiển thị</p>
                    <KLNCascadeSelect/>
                </div>
                {tabView === TabViewEnum.ManageMultimediaTabImage && (
                    <ImageTable/>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabVideo && (
                    <VideoTable/>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabAudio && (
                    <AudioTable/>
                )}
            </div>
        </>
    );
}

export default MultimediaLayouts;