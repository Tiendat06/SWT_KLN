import { createContext, useContext, useState } from "react";
import {useParams} from "react-router-dom";
import TopicType from "~/enum/Topic/TopicType";

// 1️⃣ Tạo Context với giá trị mặc định là null
const AboutTopicContext = createContext();

// 2️⃣ Provider để bọc ứng dụng
export const AboutTopicProvider = ({ children }) => {
    // Danh sách ảnh trong slideshow
    const [slideImageList, setSlideImageList] = useState([]);
    // Ảnh chính hiển thị đầu tiên
    const [slideImageMain, setSlideImageMain] = useState(slideImageList[0]);

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topicType, setTopicType] = useState(TopicType.ImageType);
    const [isLoading, setIsLoading] = useState(true);
    const {topicId} = useParams();

    return (
        <AboutTopicContext.Provider value={{
            slideImageList, setSlideImageList,
            slideImageMain, setSlideImageMain,
            selectedTopic, setSelectedTopic,
            topicId, topicType, setTopicType,
            isLoading, setIsLoading
        }}>
            {children}
        </AboutTopicContext.Provider>
    );
};

// 3️⃣ Hook để sử dụng Context
export const useAboutTopicContext = () => useContext(AboutTopicContext);