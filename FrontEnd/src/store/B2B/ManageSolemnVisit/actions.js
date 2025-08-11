import {
    GET_SOLEMN_VISITS,
    ADD_SOLEMN_VISIT,
    UPDATE_SOLEMN_VISIT,
    DELETE_SOLEMN_VISIT,
    SET_SOLEMN_VISIT_DETAIL,
    SET_SELECTED_SOLEMN_VISITS,
    CLEAR_SELECTED_SOLEMN_VISITS
} from './constants';

export const getSolemnVisitsAction = (solemnVisits) => ({
    type: GET_SOLEMN_VISITS,
    payload: solemnVisits
});

export const addSolemnVisitAction = (solemnVisit) => ({
    type: ADD_SOLEMN_VISIT,
    payload: solemnVisit
});

export const updateSolemnVisitAction = (solemnVisit) => ({
    type: UPDATE_SOLEMN_VISIT,
    payload: solemnVisit
});

export const deleteSolemnVisitAction = (solemnVisitId) => ({
    type: DELETE_SOLEMN_VISIT,
    payload: solemnVisitId
});

export const setSolemnVisitDetailAction = (solemnVisitDetail) => ({
    type: SET_SOLEMN_VISIT_DETAIL,
    payload: solemnVisitDetail
});

export const setSelectedSolemnVisitsAction = (selectedSolemnVisits) => ({
    type: SET_SELECTED_SOLEMN_VISITS,
    payload: selectedSolemnVisits
});

export const clearSelectedSolemnVisitsAction = () => ({
    type: CLEAR_SELECTED_SOLEMN_VISITS
});

export const setLoadingAction = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading
});

export const setIsUpdatedAction = (isUpdated) => ({
    type: 'SET_IS_UPDATED',
    payload: isUpdated
});
