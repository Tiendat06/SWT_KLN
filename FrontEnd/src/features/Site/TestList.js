import {useCallback, useState} from "react";
import {getTestData} from '~/services/SiteService'
import {Button} from "~/components";
import test_img from '~/assets/img/admin/ItzoneNewYearsEve.png';

function TestList() {
    const [count, setCount] = useState(0);
    const testData = getTestData(count);

    const onClickButtonIncrease = useCallback(() => {
        setCount(count + 1)
    }, [count]);

    return (
        <>
            <ul>
                {testData?.data?.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
            <img width='100' src={`${test_img}`} alt=""/>
            <br />
            <Button onClick={onClickButtonIncrease}>Increase ({count})</Button>
        </>
    )
}

export default TestList;