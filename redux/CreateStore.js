/**
 * Created by andoan on 9/29/17.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger';
const logger = createLogger();
import rootReducer, { initialState } from './RootRedux'
import rootEpic from '../epic/RootEpic'
import { createEpicMiddleware } from 'redux-observable'
const epicMiddleware = createEpicMiddleware(rootEpic);
let middleware = [
    epicMiddleware
];

middleware = [...middleware, logger];

export function initStore(state = initialState) {
    // Middleware and store enhancers
    const store = createStore(
        rootReducer,
        state,
        compose(applyMiddleware(...middleware))
    );
    return store;
}