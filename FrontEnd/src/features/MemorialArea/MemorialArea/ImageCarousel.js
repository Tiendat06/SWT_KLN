import React, {useEffect, useState} from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa"; // Import icon
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from '~/styles/Pages/Memorial/memorialArea.module.scss';
import {getBlogListService} from "~/services/MemorialService";
import {clsx} from "clsx";
import MediaType from "~/enum/MediaType/MediaType";
import {Link} from "react-router-dom";

const ImageCarousel = () => {
    const [blogList, setBlogList] = useState([]);
    useEffect(() => {
        const getBlogList = async () => {
            const data = await getBlogListService(0, 1, MediaType.KLNTDT);
            setBlogList(data?.data?.items);
        }
        getBlogList();
    }, []);

    const itemTemplate = (blog) => {
        return (
            <Card style={{
                height: 320,
                cursor: "pointer",
            }} className={clsx(styles["image-carousel__item"], "shadow-md mx-2 w-48 border-2 border-dashed border-purple-400 overflow-hidden")}>
                <Link to={`/blog/${blog.blogId}`} className="w-full h-48 d-block">
                    <img
                        style={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover"
                        }}
                        src={blog.blogImage}
                        alt={blog.blogTitle}
                    />
                </Link>
                <div className={clsx(styles["image-carousel__item-para"], "text-center font-medium bg-white text-sm")}>{blog.blogTitle}</div>
            </Card>
        );
    };

    return (
        <div className="p-4 relative">
            <Carousel
                value={blogList}
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
