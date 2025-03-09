import { createContext, useContext, useState } from "react";

// 1️⃣ Tạo Context với giá trị mặc định là null
const AboutTopicContext = createContext(null);

// 2️⃣ Provider để bọc ứng dụng
export const AboutTopicProvider = ({ children }) => {
    // Danh sách ảnh trong slideshow
    const [slideImageList, setSlideImageList] = useState([
        { id: 1, url: "https://via.placeholder.com/150", title: "Ảnh 1" },
        { id: 2, url: "https://via.placeholder.com/200", title: "Ảnh 2" },
        { id: 3, url: "https://via.placeholder.com/250", title: "Ảnh 3" },
    ]);

    // Ảnh chính hiển thị đầu tiên
    const [slideImageMain, setSlideImageMain] = useState(slideImageList[0]);

    return (
        <AboutTopicContext.Provider value={{ slideImageList, setSlideImageList, slideImageMain, setSlideImageMain }}>
            {children}
        </AboutTopicContext.Provider>
    );
};

// 3️⃣ Hook để sử dụng Context
export const useAboutTopicContext = () => {
    const context = useContext(AboutTopicContext);

    // Nếu hook được sử dụng bên ngoài Provider → Báo lỗi
    if (!context) {
        throw new Error("useAboutTopicContext phải được sử dụng trong AboutTopicProvider");
    }

    return context;
};
