import {TestList, CounterTestList} from '~/features/Site'
import styles from '~/styles/Site/site.module.scss';
import clsx from "clsx";
import test_img from "~/assets/img/admin/ItzoneNewYearsEve.png";

function Home() {
    return (
        <>
            <h1 className={clsx(styles["app"])}>Home Page</h1>
            <TestList/>
            <img width='100' src={`${test_img}`} alt=""/>
            <br/>
            <CounterTestList/>
        </>
    )
}

export default Home;