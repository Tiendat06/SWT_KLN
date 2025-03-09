import React from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa"; // Import icon
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { memorial_1, memorial_2, memorial_3, memorial_4 } from "~/assets/img";

const images = [
    { id: 1, url: memorial_1, title: "Nhà sàn thời niên thiếu" },
    { id: 2, url: memorial_2, title: "Đền tưởng niệm" },
    { id: 3, url: memorial_3, title: "Nhà trưng bày" },
    { id: 4, url: memorial_4, title: 'Chuyên đề "15 năm tù Côn Đảo"' },
];

const ImageCarousel = () => {
    const itemTemplate = (item) => {
        return (
            <Card className="shadow-md mx-2 w-48 border-2 border-dashed border-purple-400 overflow-hidden">
            <div className="w-full h-48">
                <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center font-medium p-2 bg-white text-sm">{item.title}</div>
        </Card>
        


        );
    };

    return (
        <div className="p-4 relative">
            <Carousel
                value={images}
                numVisible={4}
                numScroll={1}
                itemTemplate={itemTemplate}
                circular
                showIndicators={false}
                nextIcon={
                    <FaRegArrowAltCircleRight className="w-16 h-16 text-gray-600 hover:text-gray-800 cursor-pointer" />
                }
                prevIcon={
                    <FaRegArrowAltCircleLeft className="w-16 h-16 text-gray-600 hover:text-gray-800 cursor-pointer" />
                }
                contentClassName="flex items-center space-x-4"
            />
        </div>
    );
};

export default ImageCarousel;
