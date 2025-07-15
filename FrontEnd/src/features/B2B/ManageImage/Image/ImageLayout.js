import {useAdminContext} from "~/context/AdminContext";
import {useManageMultimediaContext} from "~/context/B2B/ManageMultimedia/ManageMultimedia";
import {useCallback, useEffect, useState} from "react";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {Link} from "react-router-dom";
import {KLNAdminTitle, KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNTabView} from "~/components";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";
import AddBrokenIcon from "~/assets/icon/AddBrokenIcon";
import clsx from "clsx";
import {ImageTable} from "~/features/B2B/ManageMultimedia";
import SlideShowType from "~/enum/SlideShowType/SlideShowType";
import {slideShowService} from "~/services/SlideShowService";
import MediaType from "~/enum/MediaType/MediaType";

const ImageLayout = () => {
    const [totalCount, setTotalCount] = useState({
        totalImageCount: 0,
    });
    const {tabView, setTabView} = useAdminContext();
    const {
        setVisible, isUpdated, selectedItems
    } = useManageMultimediaContext();

    const showModal = useCallback(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.ManageImagesTabImages);
    }, [tabView]);

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-images`}>Hình ảnh và hiện vật</Link>},
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-images`}>Danh sách hình ảnh & hiện vật</Link>}
    ];

    useEffect(() => {
        const getTotalCount = async () => {
            const totalSlideImageData = await slideShowService.getTotalSlideImageInSpecificSlideShowService(MediaType.TDTMemorial, SlideShowType.Artifact);
            setTotalCount({
                ...totalCount,
                totalImageCount: totalSlideImageData.data.totalSlideImage
            });
        }
        getTotalCount();
    }, [isUpdated]);

    return (
        <>
            <KLNAdminTitle>
                Danh sách hình ảnh & hiện vật
            </KLNAdminTitle>
            <KLNBreadCrumb items={items}/>
            <div className="d-flex flex-wrap justify-content-end align-items-center">
                <div className="">
                    <KLNButton
                        style={{
                            marginRight: 20,
                            fontWeight: "bold",
                            cursor: !selectedItems.length ? "not-allowed" : "pointer"
                        }}
                        disabled={!selectedItems.length}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={showModal}
                    >Xóa ({selectedItems.length}) <TrashBrokenIcon width={20} height={20} style={{marginLeft: 2}}/>
                    </KLNButton>
                    <KLNButton
                        style={{
                            cursor: totalCount.totalImageCount === 0 ? "not-allowed" : "pointer",
                        }}
                        urlLink={
                            `${AppRoutesEnum.AdminRoute}/manage-images${totalCount.totalImageCount !== 0 ? '/create-images' : ''}`
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
                <ImageTable
                    mediaType={MediaType.TDTMemorial}
                    slideShowType={SlideShowType.Artifact}
                />
            </div>
        </>
    )
        ;
}

export default ImageLayout;