import {TestList} from '~/features/Site'
import styles from '~/styles/Site/site.module.scss';
import clsx from "clsx";

function Home() {
    return (
        <>
            <h1 className={clsx(styles["app"])}>Home Page</h1>
            <TestList />
        </>
    )
}

export default Home;