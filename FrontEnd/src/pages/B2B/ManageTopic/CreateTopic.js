import { ManageTopicProvider } from "~/context/B2B/ManageTopic/ManageTopicContext";
import CreateTopicLayout from "~/features/B2B/ManageTopic/Topic/CreateTopicLayout";

const CreateTopic = () => (
    <ManageTopicProvider>
        <CreateTopicLayout />
    </ManageTopicProvider>
);

export default CreateTopic; 