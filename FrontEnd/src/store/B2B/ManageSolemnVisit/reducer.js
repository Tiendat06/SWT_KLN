import {
    GET_SOLEMN_VISITS,
    ADD_SOLEMN_VISIT,
    UPDATE_SOLEMN_VISIT,
    DELETE_SOLEMN_VISIT,
    SET_SOLEMN_VISIT_DETAIL,
    SET_SELECTED_SOLEMN_VISITS,
    CLEAR_SELECTED_SOLEMN_VISITS
} from './constants';

export const initialState = {
    solemnVisits: [],
    solemnVisitDetail: null,
    selectedSolemnVisits: [],
    isLoading: false,
    isUpdated: false
};

export const manageSolemnVisitReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SOLEMN_VISITS:
            return {
                ...state,
                solemnVisits: action.payload
            };

        case ADD_SOLEMN_VISIT:
            return {
                ...state,
                solemnVisits: [...state.solemnVisits, action.payload]
            };

        case UPDATE_SOLEMN_VISIT:
            return {
                ...state,
                solemnVisits: state.solemnVisits.map(item =>
                    item.solemnVisitId === action.payload.solemnVisitId
                        ? action.payload
                        : item
                ),
                solemnVisitDetail: state.solemnVisitDetail?.solemnVisitId === action.payload.solemnVisitId
                    ? action.payload
                    : state.solemnVisitDetail
            };

        case DELETE_SOLEMN_VISIT:
            return {
                ...state,
                solemnVisits: state.solemnVisits.filter(item =>
                    !action.payload.includes(item.solemnVisitId)
                )
            };

        case SET_SOLEMN_VISIT_DETAIL:
            return {
                ...state,
                solemnVisitDetail: action.payload
            };

        case SET_SELECTED_SOLEMN_VISITS:
            return {
                ...state,
                selectedSolemnVisits: action.payload
            };

        case CLEAR_SELECTED_SOLEMN_VISITS:
            return {
                ...state,
                selectedSolemnVisits: []
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };

        case 'SET_IS_UPDATED':
            return {
                ...state,
                isUpdated: action.payload
            };

        default:
            return state;
    }
};
