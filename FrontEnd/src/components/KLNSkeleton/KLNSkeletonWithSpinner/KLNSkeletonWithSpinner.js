import {ProgressSpinner} from "primereact/progressspinner";
import {Skeleton} from "primereact/skeleton";

const KLNSkeletonWithSpinner = ({width = "100%", parentHeight = "100%", height = "100%", ...props}) => {
    return (
        <div style={{position: "relative", width, height: parentHeight}}>
            <Skeleton
                height={height}
                {...props}
            />

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                }}
            >
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="2" fill="var(--surface-ground)"
                                 animationDuration=".5s"/>
            </div>
        </div>
    );
}

export default KLNSkeletonWithSpinner;