import {useCallback, useReducer, useState} from "react";
import reducer, {initialState} from "~/store/Site/reducer";
import {addCount} from "~/store/Site/actions";
import {getTestData} from '~/services/SiteService'
import {Button} from "~/components";
import {FormatTest} from "~/utils";
import test_img from '~/assets/img/admin/ItzoneNewYearsEve.png';

function TestList() {
    const [count, setCount] = useState(0);
    const testData = getTestData(count);

    const [state, dispatch] = useReducer(reducer, initialState);
    let {counter, counterList} = state;

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
            <Button onClick={() => dispatch(addCount(counter + 1))}>Increase 2 ({counter})</Button>
            <ul>
                {counterList?.map((item, index) => (
                    <li key={`counterList-${index}`}>{FormatTest(item)}</li>
                ))}
            </ul>
        </>
    )
}

export default TestList;