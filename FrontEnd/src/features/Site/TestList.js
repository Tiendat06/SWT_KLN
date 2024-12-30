import {useCallback, useState} from "react";
import {getTestData} from '~/services/SiteService'
import {Button} from "~/components";

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
            <Button onClick={onClickButtonIncrease}>Increase ({count})</Button>
        </>
    )
}

export default TestList;