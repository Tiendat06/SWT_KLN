import {Link} from "react-router-dom";
import clsx from "clsx";
import styles from "~/styles/Layouts/header.module.scss";
import {KLNDropdown} from "~/components";
import {useEffect, useState} from "react";
import {blogService} from "~/services/BlogService";
import MediaType from "~/enum/MediaType/MediaType";

const MemorialTDTLink = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [memorialTDTDropdownItems, setMemorialTDTDropdownItems] = useState([]);

    useEffect(() => {
        const GetBlogList = async () => {
            setMemorialTDTDropdownItems([]);
            const data = await blogService.getBlogListService(4, 1, MediaType.TDTMemorial);
            let items = data?.data?.items;
            setMemorialTDTDropdownItems((prevItems) => [
                ...items.map((item) => ({
                    id: item.blogId,
                    text: item.blogTitle,
                    href: `/blog/${item.blogId}`
                })),
                { id: 1, text: 'LÃNH ĐẠO VIẾNG', href: `/memorial-solemn-visit` }
            ]);
        }
        GetBlogList();
    }, []);

    return (
        <>
            <div style={{
                paddingLeft: 15,
                paddingRight: 15,
            }} onMouseMove={() => setDropdownVisible(true)}
                 onMouseLeave={() => setDropdownVisible(false)}
                 className="position-relative">
                <Link to={'/memorial-area'} className={clsx(styles['header-bottom__navigate-item'], 'position-relative')}>
                    <p className={clsx(styles['header-bottom__navigate-item__para'], 'link-underline')}>KHU LƯU NIỆM BÁC TÔN</p>
                </Link>
                {isDropdownVisible &&
                    <KLNDropdown
                        itemList={memorialTDTDropdownItems}
                        setDropdownVisible={setDropdownVisible}
                    />
                }
            </div>
        </>
    )
}

export default MemorialTDTLink;