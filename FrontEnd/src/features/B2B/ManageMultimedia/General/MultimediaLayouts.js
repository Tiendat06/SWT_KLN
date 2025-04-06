import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {KLNBreadCrumb, KLNButton, KLNTabView, KLNCascadeSelect} from "~/components";
import {faSquarePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import {ImageTable, AudioTable, VideoTable} from '~/features/B2B/ManageMultimedia';
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import DeleteMany from "~/features/B2B/ManageMultimedia/General/DeleteMany";

const MultimediaLayouts = () => {
    const {tabView, setTabView} = useAdminContext();
    const {setVisible} = useManageMultimediaContext();

    const {
        setDeleteAction
    } = useAdminContext();

    const showModal = () => {
        setVisible(true);
    }

    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.ManageMultimediaTabImage);
    }, [tabView]);

    const tabViewData = [
        {id: 1, tabView: TabViewEnum.ManageMultimediaTabImage, title: 'Ảnh'},
        {id: 2, tabView: TabViewEnum.ManageMultimediaTabVideo, title: 'Video'},
        {id: 3, tabView: TabViewEnum.ManageMultimediaTabAudio, title: 'Nhạc'},
    ];

    const items = [
        { template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-multimedia`}>Tài liệu đa phương tiện</Link> },
        { template: () => {
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
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {tabView === TabViewEnum.ManageMultimediaTabImage && (
                    <>Danh sách ảnh</>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabVideo && (
                    <>Danh sách video</>
                )}
                {tabView === TabViewEnum.ManageMultimediaTabAudio && (
                    <>Danh sách nhạc</>
                )}
            </h2>
            <KLNBreadCrumb items={items} />
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <KLNTabView
                    onClickTabView={() => setDeleteAction(false)}
                    data={tabViewData}
                />
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "normal"
                        }}
                        options={4}
                        icon={faTrash}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                        onClick={showModal}
                    >Xóa</KLNButton>
                    <KLNButton
                        options={5}
                        icon={faSquarePlus}
                        iconStyle={{
                            marginLeft: 10,
                            fontWeight: "normal"
                        }}
                    >Thêm mới</KLNButton>
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
            <DeleteMany />
        </>
    );
}

export default MultimediaLayouts;