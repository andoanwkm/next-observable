/**
 * Created by andoan on 9/29/17.
 */
import { createActions, handleActions, combineActions } from 'redux-actions'
export const defaultState = { get: { data: null, loading: false, error: null }, index: { data: [], loading: false, error: null, hasMore: true, page: 1 } };
export const { quizGetRequest, quizGetSuccess, quizGetFailure, quizListIndexRequest, quizListIndexReset, quizListIndexSuccess, quizListIndexFailure } = createActions({
    QUIZ_GET_REQUEST: id => (id),
    QUIZ_GET_SUCCESS: payload => (payload),
    QUIZ_GET_FAILURE: error => (error),
    QUIZ_LIST_INDEX_REQUEST: (params) => (params),
    QUIZ_LIST_INDEX_RESET: () => null,
    QUIZ_LIST_INDEX_SUCCESS: payload => (payload),
    QUIZ_LIST_INDEX_FAILURE: error => (error),
});

const reducer = handleActions({
    QUIZ_GET_REQUEST: (state, action) => ({...state, get: { data: null, loading: true, error: null } }),
    QUIZ_GET_SUCCESS: (state, action) => ({...state, get: { data: action.payload, loading: false, error: null } }),
    QUIZ_GET_FAILURE: (state, action) => ({...state, get: { data: null, loading: false, error: action.error } }),
    QUIZ_LIST_INDEX_REQUEST: (state, action) => ({...state, index: { ...state.index, loading: true, error: null } }),
    QUIZ_LIST_INDEX_RESET: (state, action) => ({...state, index: { data: [], loading: false, error: null, hasMore: true, page: 1 } }),
    QUIZ_LIST_INDEX_SUCCESS: (state, action) => ({...state, index: { ...state.index, data: state.index.data.concat(action.payload), loading: false, error: null } }),
    QUIZ_LIST_INDEX_FAILURE: (state, action) => ({...state, index: { ...state.index, loading: false, error: action.error } })
}, defaultState);

export default reducer;