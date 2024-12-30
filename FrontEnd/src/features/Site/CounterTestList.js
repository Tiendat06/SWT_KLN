import {Button} from "~/components";
import {useReducer} from "react";
import reducer, {initialState} from "~/store/Site/reducer";
import {addCount} from "~/store/Site/actions";
import {FormatTest} from "~/utils";

function CounterTestList() {

    const [state, dispatch] = useReducer(reducer, initialState);
    let {counter, counterList} = state;
    return (
        <>
            <Button onClick={() => dispatch(addCount(counter + 1))}>Increase 2 ({counter})</Button>
            <ul>
                {counterList?.map((item, index) => (
                    <li key={`counterList-${index}`}>{FormatTest(item)}</li>
                ))}
            </ul>
        </>
    )
}

export default CounterTestList;