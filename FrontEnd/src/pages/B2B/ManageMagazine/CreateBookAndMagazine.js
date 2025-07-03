import {ManageMagazineProvider} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {Helmet} from "react-helmet-async";
import {useAdminContext} from "~/context/AdminContext";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {Link} from "react-router-dom";
import {
    ADD_BOOK_TITLE, ADD_MAGAZINE_TITLE
} from "~/utils/Constansts";
import {KLNBreadCrumb} from "~/components";
import React from "react";
import {CreateMagazineForm, CreateBookForm} from "~/features/B2B/ManageMagazine";

const CreateBookAndMagazine = () => {
    const {tabView, setTabView} = useAdminContext();

    const items = [
        {template: () => <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Sách báo & Tạp chí</Link>},
        {
            template: () =>
                tabView === TabViewEnum.ManageMagazineTabBook ?
                    <Link onClick={() => setTabView(TabViewEnum.ManageMagazineTabBook)}
                          to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách sách báo</Link>
                    : tabView === TabViewEnum.ManageMagazineTabMagazine ?
                        <Link onClick={() => setTabView(TabViewEnum.ManageMagazineTabMagazine)}
                              to={`${AppRoutesEnum.AdminRoute}/manage-magazine`}>Danh sách tạp chí</Link>
                        : ''
        },
        {
            template: () =>
                <Link to={`${AppRoutesEnum.AdminRoute}/manage-magazine/create-magazine`}>
                    {tabView === TabViewEnum.ManageMagazineTabBook ? 'Thêm sách báo' :
                        tabView === TabViewEnum.ManageMagazineTabMagazine ? 'Thêm tạp chí' :
                            ''
                    }
                </Link>
        }
    ];

    return (
        <ManageMagazineProvider>
            <Helmet>
                <title>
                    {tabView === TabViewEnum.ManageMagazineTabBook ? ADD_BOOK_TITLE
                        : tabView === TabViewEnum.ManageMagazineTabMagazine ? ADD_MAGAZINE_TITLE
                            : ''
                    }
                </title>
            </Helmet>
            <h2 style={{
                marginLeft: 15,
                fontWeight: "bold",
            }}>
                {tabView === TabViewEnum.ManageMagazineTabBook ? 'Thêm Sách & Báo'
                    : tabView === TabViewEnum.ManageMagazineTabMagazine ? 'Thêm tạp chí'
                        : ''
                }
            </h2>
            <KLNBreadCrumb items={items}/>
            {tabView === TabViewEnum.ManageMagazineTabBook ? <CreateBookForm />
                : tabView === TabViewEnum.ManageMagazineTabMagazine ? <CreateMagazineForm />
                    : <></>
            }
        </ManageMagazineProvider>
    );
}

export default CreateBookAndMagazine;