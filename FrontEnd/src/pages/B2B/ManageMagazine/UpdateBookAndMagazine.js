import {ManageMagazineProvider} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {Helmet} from "react-helmet-async";
import {UPDATE_BOOK_MAGAZINE_TITLE} from "~/utils/Constansts";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import React from "react";
import {useAdminContext} from "~/context/AdminContext";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {KLNBreadCrumb} from "~/components";
import {UpdateMagazineForm, UpdateBookForm} from "~/features/B2B/ManageMagazine";

const UpdateBookAndMagazine = () => {
    const {tabView, setTabView} = useAdminContext();

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Sách báo & Tạp chí</Link>},
        {
            template: () =>
                tabView === TabViewEnum.ManageMagazineTabBook ?
                    <Link onClick={() => setTabView(TabViewEnum.ManageMagazineTabBook)}
                          to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách sách</Link>
                    : tabView === TabViewEnum.ManageMagazineTabMagazine ?
                        <Link onClick={() => setTabView(TabViewEnum.ManageMagazineTabMagazine)}
                              to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách báo & tạp chí</Link>
                        : ''
        },
        {
            template: () =>
                <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine/create-magazine`}>
                    {tabView === TabViewEnum.ManageMagazineTabBook ? 'Cập nhật sách' :
                        tabView === TabViewEnum.ManageMagazineTabMagazine ? 'Cập nhật báo & tạp chí' :
                            ''
                    }
                </Link>
        }
    ];

    return (
        <ManageMagazineProvider>
            <Helmet>
                <title>{UPDATE_BOOK_MAGAZINE_TITLE}</title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {tabView === TabViewEnum.ManageMagazineTabBook ? 'Cập nhật Sách'
                    : tabView === TabViewEnum.ManageMagazineTabMagazine ? 'Cập nhật báo & tạp chí'
                        : ''
                }
            </h2>
            <KLNBreadCrumb items={items}/>
            {tabView === TabViewEnum.ManageMagazineTabBook ? <UpdateBookForm />
                : tabView === TabViewEnum.ManageMagazineTabMagazine ? <UpdateMagazineForm />
                    : <></>
            }
        </ManageMagazineProvider>
    );
}

export default UpdateBookAndMagazine;