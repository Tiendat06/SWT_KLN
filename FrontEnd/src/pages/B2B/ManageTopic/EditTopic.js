import { ManageTopicProvider } from "~/context/B2B/ManageTopic/ManageTopicContext";
import EditTopicLayout from "~/features/B2B/ManageTopic/Topic/EditTopicLayout";

const EditTopic = () => (
    <ManageTopicProvider>
        <EditTopicLayout />
    </ManageTopicProvider>
);

export default EditTopic; 