import {memo} from "react";

function Button({children, onClick}) {
    return (
        <>
            <button onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default memo(Button);