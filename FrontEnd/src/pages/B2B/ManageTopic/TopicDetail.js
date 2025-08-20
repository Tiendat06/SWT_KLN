import {TopicDetailLayouts} from "~/features/B2B/ManageTopic";
import {ManageTopicProvider} from "~/context/B2B/ManageTopic/ManageTopicContext";
import {Helmet} from "react-helmet-async";
import {useEffect} from "react";
import {useAdminContext} from "~/context/AdminContext";
import TabViewEnum from "~/enum/TabView/TabViewEnum";
import {useParams} from "react-router-dom";
import AddImageModal from "~/features/B2B/ManageTopic/Image/AddImageModal";
import AddVideoModal from "~/features/B2B/ManageTopic/Video/AddVideoModal";
import EditImageModal from "~/features/B2B/ManageTopic/Image/EditImageModal";
import EditVideoModal from "~/features/B2B/ManageTopic/Video/EditVideoModal";
import DeleteImageModal from "~/features/B2B/ManageTopic/Image/DeleteImageModal";
import DeleteVideoModal from "~/features/B2B/ManageTopic/Video/DeleteVideoModal";

const TopicDetail = () => {
    const {setTabView} = useAdminContext();
    const {topicId} = useParams();

    useEffect(() => {
        setTabView(TabViewEnum.TopicDetailTabImage);
    }, [setTabView]);

    return (
        <ManageTopicProvider>
            <Helmet>
                <title>Chi tiết chuyên đề</title>
            </Helmet>
            <TopicDetailLayouts topicId={topicId} />
            
            {/* Modal Components */}
            <AddImageModal topicId={topicId} />
            <AddVideoModal topicId={topicId} />
            <EditImageModal topicId={topicId} />
            <EditVideoModal topicId={topicId} />
            <DeleteImageModal topicId={topicId} />
            <DeleteVideoModal topicId={topicId} />
        </ManageTopicProvider>
    );
};

export default TopicDetail; 