import styles from '~/styles/Components/CustomCategory/customCategory.module.scss';
import clsx from "clsx";
import {Link} from "react-router-dom";

const CustomCategory = ({
        title = '',
        categoryList = [],
        choosingItemId = '',
        totalPage = 0,
        children
    }) => {

    return (
        <>
            <div className={clsx(styles["custom-all"])}>
                <div className={clsx(styles["custom-category"], 'col-lg-3 col-md-3 col-sm-12')}>
                    <div className={clsx(styles["custom-category--inner"])}>
                        <h3 className={clsx(styles["custom-category__title"])}>{title}</h3>
                    </div>
                    <div className={clsx(styles["custom-category__list"])}>
                        {categoryList?.map((item, index) => (
                            <li key={`custom-category-${item?.slideShowId}`}
                                className={clsx(styles["custom-category__item"],
                                    ((choosingItemId === item?.slideShowId) && styles["custom-category__item--choose"]))}>
                                <Link to={`/memorial-exhibition/${item?.slideShowId}`}>
                                    <p>{item?.title}</p>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>

                <div className={clsx(styles["custom-content"], 'col-lg-9 col-md-9 col-sm-12')}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CustomCategory;