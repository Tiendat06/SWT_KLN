import styles from '~/styles/Components/CustomCategory/customCategory.module.scss';
import clsx from "clsx";

const CustomCategory = ({
        title = '',
        categoryList = [],
        totalPage = 0,
        children
    }) => {

    return (
        <>
            <div className={clsx(styles["custom-all"])}>
                <div className={clsx(styles["custom-category"], 'col-lg-5 col-md-5 col-sm-12')}>
                    <div className={clsx(styles["custom-category--inner"])}>
                        <h3 className={clsx(styles["custom-category__title"])}>{title}</h3>
                    </div>
                </div>

                <div className={clsx(styles["custom-category__list"])}>

                </div>

                <div className={clsx(styles["custom-content"], 'col-lg-7 col-md-7 col-sm-12')}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CustomCategory;