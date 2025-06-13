import clsx from "clsx";
import styles from "~/styles/Pages/B2C/Handiwork/handiwork.module.scss";
import {useEffect, useState} from "react";
import {blogService} from "~/services/BlogService";
import MediaType from "~/enum/MediaType/MediaType";
import {Link} from "react-router-dom";
import {useHandiworkContext} from "~/context/B2C/Handiwork/HandiworkContext";

const CategoryList = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        const getBlogList = async () => {
            const data = await blogService.getBlogListService(0, 1, MediaType.TDTHandiwork);
            setBlogList(data?.data?.items);
        }
        getBlogList();
    }, []);
    const {blogId} = useHandiworkContext();

    return (
      <>
          {blogList?.map((item, index) => (
              <li key={`category-list-${item.blogId}-${index}`} className={clsx(styles["handiwork-category__item"],
                  (item?.blogId === blogId && styles["handiwork-category__item--choose"])
              )}>
                  <Link to={`/handiwork/${item.blogId}`}>
                      <p>{item?.blogTitle}</p>
                  </Link>
              </li>
          ))}
      </>
    );
}

export default CategoryList;