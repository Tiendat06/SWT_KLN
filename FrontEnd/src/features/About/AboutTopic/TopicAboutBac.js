import clsx from "clsx";
import styles from "~/styles/Pages/About/aboutTopic.module.scss";
import { useState } from "react";
import BacHo_vaBac from '~/assets/img/topicaboutBac/BacHovaBac.png';
import { image1, image2, image3, image4 } from "~/assets/img";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

const topicList = [
    {
        id: 1,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo",
        image: BacHo_vaBac,
    },
    {
        id: 2,
        title: " Chuyên đề demo 1",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        image: BacHo_vaBac,
    },
    {
        id: 3,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 4,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 5,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 6,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 7,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 8,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    },
    {
        id: 9,
        title: "Ấm mãi lời ca",
        fullTitle: "Ấm mãi lời ca: tập ca cổ, nhiều tác giả",
        description: "Nhân kỷ niệm 30 năm ngày giải phóng miền Nam, thống nhất Tổ quốc (30.4.1975 - 30.4.2005), Hội Văn học nghệ thuật An Giang xin giới thiệu tập ca cổ Ấm mãi lời ca, gồm những tác phẩm viết về đề tài truyền thống của tác giả An Giang. Hầu hết tác phẩm trong tập này được hoàn thành trong Trại sáng tác kịch bản sân khấu và bài ca cổ do Hội Văn học nghệ thuật và Sở Văn hóa thông tin An Giang kết hợp tổ chức tại Soài So (Tri Tôn) năm 2004.",
        // image: ammailoica,
    }
];


const extraImages = [image1, image2, image3, image4];
const ITEMS_PER_PAGE = 7;

function TopicAboutBac() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState(topicList[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const totalPages = Math.ceil(topicList.length / ITEMS_PER_PAGE);
    const visibleTopic = topicList.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % extraImages.length;
            return newIndex;
        });
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + extraImages.length) % extraImages.length;
            return newIndex;
        });
    };

    return (
        <div className={clsx(styles.TopicAboutBac)}>
            <div className={clsx(styles.TopicAboutBac__sidebar)}>
                <h3 className={clsx(styles.TopicAboutBac__title)}>Danh sách chuyên đề</h3>
                <ul className={clsx(styles.TopicAboutBac__list)}>
                    {visibleTopic.map((topic) => (
                        <li
                            key={topic.id}
                            className={clsx(styles.TopicAboutBac__listItem, {
                                [styles["TopicAboutBac__listItem--active"]]: selectedTopic?.id === topic.id,
                            })}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            {topic.title}
                        </li>
                    ))}
                </ul>

                {/* Dots for pagination */}
                <div className={clsx(styles.TopicAboutBac__pagination)}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <span
                            key={index}
                            className={clsx(styles.dot, {
                                [styles.dotActive]: currentPage === index,
                            })}
                            onClick={() => index !== currentPage && setCurrentPage(index)}
                        ></span>
                    ))}
                </div>
            </div>

            <div className={clsx(styles.TopicAboutBac__content)}>
                <img className={clsx(styles.TopicAboutBac__image)} src={selectedTopic.image} alt={selectedTopic.title} />
                <div className={clsx(styles.TopicAboutBac__overlay)}>
                    <p>{selectedTopic.description}</p>
                </div>
                <div className={clsx(styles.TopicAboutBac__extraImages)}>
                    <FaRegArrowAltCircleLeft className={clsx(styles.arrowIcon)} onClick={handlePrevImage} />
                    {extraImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Hình ${index + 1}`}
                            className={clsx(styles.extraImage, {
                                [styles.extraImageActive]: currentImageIndex === index,
                                [styles.extraImageBorder]: currentImageIndex === index,
                            })}
                        />
                    ))}
                    <FaRegArrowAltCircleRight className={clsx(styles.arrowIcon)} onClick={handleNextImage} />
                </div>
            </div>
        </div>
    );
}

export default TopicAboutBac;
