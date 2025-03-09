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
                <div className={clsx(styles["custom-category"], 'col-lg-4 col-md-4 col-sm-12')}>
                    <div className={clsx(styles["custom-category--inner"])}>
                        <h3 className={clsx(styles["custom-category__title"])}>{title}</h3>
                    </div>
                    <div className={clsx(styles["custom-category__list"])}>
                        <li className={clsx(styles["custom-category__item"])}>
                            <p>Quê hương thời chiến</p>
                        </li>
                        <li className={clsx(styles["custom-category__item"])}>
                            <p>Quê hương thời chiến</p>
                        </li>
                        <li className={clsx(styles["custom-category__item"])}>
                            <p>Quê hương thời chiến</p>
                        </li>
                        <li className={clsx(styles["custom-category__item"])}>
                            <p>Quê hương thời chiến</p>
                        </li>
                    </div>
                </div>

                <div className={clsx(styles["custom-content"], 'col-lg-8 col-md-8 col-sm-12')}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CustomCategory;