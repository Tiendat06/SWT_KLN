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
                    <li key={index}><p className='mb-0'>{item.name}</p></li>
                ))}
            </ul>
            <Button onClick={onClickButtonIncrease}>Increase ({count})</Button>
        </>
    )
}

export default TestList;