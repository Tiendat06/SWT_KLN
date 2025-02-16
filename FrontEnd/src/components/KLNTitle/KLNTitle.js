import clsx from "clsx";
import styles from "~/styles/Components/KLNTitle/KLNTitle.module.scss";

function KLNTitle({children}){
    return (
        <>
            <div className={clsx(styles["klnTitle-title"])}>
                <h3 className={clsx(styles['klnTitle-title__text'])}>
                    {children}
                </h3>
            </div>
        </>
    )
}

export default KLNTitle;