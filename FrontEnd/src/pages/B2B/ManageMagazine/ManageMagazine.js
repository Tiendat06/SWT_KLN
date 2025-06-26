import {ManageMagazineProvider} from "~/context/B2B/ManageMagazine/ManageMagazine";
import {BOOK_MAGAZINE_TITLE} from "~/utils/Constansts";
import {Helmet} from "react-helmet-async";
import {MagazineLayouts} from "~/features/B2B/ManageMagazine";
import {useAdminContext} from "~/context/AdminContext";
import {useEffect} from "react";
import {getLocalStorage} from "~/utils/Storage";
import TabViewEnum from "~/enum/TabView/TabViewEnum";

const ManageMagazine = () => {
    const {tabView, setTabView} = useAdminContext();

    useEffect(() => {
        if (getLocalStorage('tabView') === null
            || getLocalStorage('tabView') === undefined
            || (tabView !== TabViewEnum.ManageMagazineTabBook
                && tabView !== TabViewEnum.ManageMagazineTabMagazine)
        )
            setTabView(TabViewEnum.ManageMagazineTabBook);
    }, [tabView, setTabView]);

    return (
        <ManageMagazineProvider>
            <Helmet>
                <title>{BOOK_MAGAZINE_TITLE}</title>
            </Helmet>
            <MagazineLayouts/>
        </ManageMagazineProvider>
    )
}

export default ManageMagazine;