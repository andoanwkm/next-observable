/**
 * Created by andoan on 9/29/17.
 */
import { combineReducers } from 'redux'
import quiz, { defaultState } from './QuizRedux';
export const initialState = {
    quiz: defaultState
}
export default combineReducers({
    quiz
})
