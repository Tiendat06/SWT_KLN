import {ProgressSpinner} from "primereact/progressspinner";
import clsx from "clsx";
import styles from "~/styles/Components/KLNProgressSpinner/klnProgressSpinner.module.scss";

const KLNProgressSpinner = ({
                                mode = "red",
                                ...props
                            }) => {
    const customMode = {
        "light": styles["custom-light"],
        "red": styles["custom-red"],
    }[mode] || styles["custom-light"];

    return (
        <ProgressSpinner
            {...props}
            className={clsx(props.className, customMode)}
            style={{
                height: 20,
                width: 20,
                ...props.style
            }}/>
    )
}

export default KLNProgressSpinner;