import {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import styles from "~/styles/Pages/B2C/About/aboutSidebarBooks.module.scss";
import {KLNReactDotPaginate} from "~/components";
import {useAboutTopicContext} from "~/context/B2C/About/AboutTopicContext";
import {getTopicByIdService, getTopicListService} from "~/services/TopicService";
import {useNavigate} from "react-router-dom";
import MediaType from "~/enum/MediaType/MediaType";

const SidebarTopic = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [topicList, setTopicList] = useState([]);
    const ITEMS_PER_PAGE = 7;
    const navigate = useNavigate();

    const {
        selectedTopic,
        setSelectedTopic,
        topicId,
        topicType,
        setIsLoading, isLoading
    } = useAboutTopicContext();

    useEffect(() => {
        const getDefaultTopic = async () => {
            const defaultData = await getTopicByIdService(topicId);
            setSelectedTopic(defaultData?.data);
        }
        getDefaultTopic();
    }, []);

    useEffect(() => {
        const getTopicList = async () => {
            const data = await getTopicListService(ITEMS_PER_PAGE, currentPage, MediaType.PresidentTDT, topicType);
            onClickTopic(data?.data?.items[0]);
            setTopicList(data?.data?.items);
            setPageCount(Math.ceil(data?.data?.totalCount / ITEMS_PER_PAGE));
            setIsLoading(!isLoading);
        }
        getTopicList();
    }, [currentPage, topicType]);

    const onClickTopic = (topic) => {
        setSelectedTopic(topic);
        navigate(`/about-topic/${topic.topicId}`);
    }

    const onClickCurrentPage = useCallback((index) => {
        setCurrentPage(index + 1)
    }, []);

    return (
        <div className={clsx(styles.ListOfBooks)}>
            <div className={clsx(styles.ListOfBooks__sidebar)}>
                <h3 className={clsx(styles.ListOfBooks__title)}>Danh sách chuyên đề</h3>
                <ul className={clsx(styles.ListOfBooks__list)}>
                    {topicList?.map((topic) => (
                        <li
                            key={topic?.topicId}
                            className={clsx(styles.ListOfBooks__listItem,
                                {
                                    [styles["ListOfBooks__listItem--active"]]: selectedTopic?.topicId === topic?.topicId,
                                }
                            )}
                            onClick={() => onClickTopic(topic)}
                        >
                            <p>{topic?.capture}</p>
                        </li>
                    ))}
                </ul>
                <KLNReactDotPaginate
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onClickCurrentPage={onClickCurrentPage}
                />
            </div>
        </div>
    );
}

export default SidebarTopic;