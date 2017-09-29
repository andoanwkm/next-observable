/**
 * Created by andoan on 9/29/17.
 */
import { get } from '../utils/fetch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { quizGetSuccess, quizListIndexSuccess } from '../redux/QuizRedux';
import qs from 'qs';
export const getQuizEpic = (action$, store) => {
    return action$.ofType('QUIZ_GET_REQUEST')
        // .debounceTime(400)
        .flatMap(action => {
            return ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${action.payload.id}`)
                .map(response =>  {
                    quizGetSuccess(response)
                })
                .catch(err => {
                    return Observable.of({
                        type: 'QUIZ_GET_FAILURE',
                        error: err.xhr.response.message
                    })
                })
        })
}
export const listIndexQuizEpic = (action$, store) => {
    return action$.ofType('QUIZ_INDEX_LIST_REQUEST')
        .flatMap(action => {
            return ajax.getJSON(`https://jsonplaceholder.typicode.com/users?${qs.stringify(action.params)}`)
                .map(response =>  {
                    quizListIndexSuccess(response)
                })
                .catch(err => {
                    return Observable.of({
                        type: 'QUIZ_INDEX_LIST_FAILURE',
                        error: err.xhr.response.message
                    })
                })
        })
}