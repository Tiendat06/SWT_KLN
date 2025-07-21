import {TopicLayouts} from "~/features/B2B/ManageTopic";
import {ManageTopicProvider} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {Helmet} from "react-helmet-async";
import {MANAGE_TOPIC_TITLE} from "~/utils/Constansts";
import {useEffect} from "react";
import {useAdminContext} from "~/context/AdminContext";
import TabViewEnum from "~/enum/TabView/TabViewEnum";

const ManageTopic = () => {
    const {setTabView} = useAdminContext();

    useEffect(() => {
        setTabView(TabViewEnum.ManageTopicTabImage);
    }, [setTabView]);

    return (
        <ManageTopicProvider>
            <Helmet>
                <title>{MANAGE_TOPIC_TITLE}</title>
            </Helmet>
            <TopicLayouts />
        </ManageTopicProvider>
    );
};

export default ManageTopic;