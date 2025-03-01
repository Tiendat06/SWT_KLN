import {CustomAudio} from "~/components";
import {clsx} from "clsx";
import styles from '~/styles/Pages/About/aboutMusic.module.scss';

function MainAudio() {

    return (
        <>
            <div className={clsx(styles["about-music__main"], 'col-lg-8 col-md-7 col-sm-12')}>
                <CustomAudio
                    src="https://res.cloudinary.com/dydpf7z8u/video/upload/v1736072269/08_buaeek.mp3"
                />
            </div>
        </>
    )
}

export default MainAudio;