import {ADD_COUNT} from './constansts'

export const initialState = {
    counter: 0,
    counterList: []
}

function reducer(state, action) {
    let newState;
    switch (action.type) {
        case ADD_COUNT:
            newState = {
                ...state,
                counter: state.counter + 1,
                counterList: [...state.counterList, action.payLoad]
            }
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newState;
}

export default reducer;