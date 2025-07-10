import {useAdminContext} from "~/context/AdminContext";
import {useManageMagazineContext} from "~/context/B2B/ManageMagazine/ManageMagazine";
import React, {useCallback, useEffect, useState} from "react";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {KLNAdminTitle, KLNBreadCrumb, KLNButton, KLNCascadeSelect, KLNTabView} from "~/components";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {BookTable, MagazineTable} from "~/features/B2B/ManageMagazine";
import {bookService} from "~/services/BookService";
import {magazineService} from "~/services/MagazineService";
import KLNButtonEnum from "~/enum/Button/KLNButtonEnum";
import AddBrokenIcon from "~/assets/icon/AddBrokenIcon";
import TrashBrokenIcon from "~/assets/icon/TrashBrokenIcon";

const MagazineLayouts = () => {
    const {tabView, setTabView, setDeleteAction, setSelectedPageOption} = useAdminContext();
    const {setVisible, setSelectedItems, selectedItems, isUpdated} = useManageMagazineContext();
    const [tabViewData, setTabViewData] = useState([]);

    const showModal = useCallback(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        if (tabView === null || tabView === undefined)
            setTabView(TabViewEnum.ManageMagazineTabBook);
    }, [tabView]);

    useEffect(() => {
        const getTotalCount = async () => {
            const totalBookData = await bookService.getBookListService(1, 1);
            const totalMagazineData = await magazineService.getMagazineListService(1, 1);

            setTabViewData([
                {
                    id: 1,
                    tabView: TabViewEnum.ManageMagazineTabBook,
                    title: 'Sách & Báo',
                    totalCount: totalBookData.data?.totalCount
                },
                {
                    id: 2,
                    tabView: TabViewEnum.ManageMagazineTabMagazine,
                    title: 'Tạp chí',
                    totalCount: totalMagazineData.data?.totalCount
                }
            ]);
        }
        getTotalCount();
    }, [isUpdated]);

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Sách báo & Tạp chí</Link>},
        {
            template: () => {
                return (
                    <>
                        {tabView === TabViewEnum.ManageMagazineTabBook && (
                            <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách sách báo</Link>
                        )}
                        {tabView === TabViewEnum.ManageMagazineTabMagazine && (
                            <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách tạp chí</Link>
                        )}
                    </>
                )
            }
        },
    ];
    return (
        <>
            <KLNAdminTitle>
                Sách báo & Tạp chí
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
                        disabled={!selectedItems.length}
                        style={{
                            marginRight: 20,
                            fontWeight: "bold",
                            cursor: !selectedItems.length ? "not-allowed": "pointer"
                        }}
                        options={KLNButtonEnum.secondDangerBtn}
                        onClick={showModal}
                    >Xóa ({selectedItems.length}) <TrashBrokenIcon width={20} height={20} style={{marginLeft: 2}}/>
                    </KLNButton>
                    <KLNButton
                        urlLink={
                            tabView === TabViewEnum.ManageMagazineTabBook
                                ? `${AppRoutesEnum.AdminRoute}/manage-magazine/create-book`
                                : tabView === TabViewEnum.ManageMagazineTabMagazine
                                    ? `${AppRoutesEnum.AdminRoute}/manage-magazine/create-magazine`
                                    : ''
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
                {tabView === TabViewEnum.ManageMagazineTabBook && (
                    <BookTable/>
                )}
                {tabView === TabViewEnum.ManageMagazineTabMagazine && (
                    <MagazineTable/>
                )}
            </div>
        </>
    )
}

export default MagazineLayouts;