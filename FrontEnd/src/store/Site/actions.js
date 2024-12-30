import {ADD_COUNT} from './constansts';

export const addCount = payLoad => {
    return {
        type: ADD_COUNT,
        payLoad
    }
}