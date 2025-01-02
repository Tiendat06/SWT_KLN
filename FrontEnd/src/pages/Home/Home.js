import {TestList, CounterTestList} from '~/features/Site'
import styles from '~/styles/Site/site.module.scss';
import clsx from "clsx";
import test_img from "~/assets/img/admin/ItzoneNewYearsEve.png";
import {SlideBanner, Button} from "~/components";

function Home() {
    return (
        <>
            <SlideBanner />
            <h1 className={clsx(styles["test"])}>Home Page</h1>
            <Button options={2}>
                Xem chi tiết
            </Button>
            <TestList/>
            <img width='100' src={`${test_img}`} alt=""/>
            <br/>
            <CounterTestList/>
        </>
    )
}

export default Home;