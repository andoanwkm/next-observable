/**
 * Created by andoan on 9/29/17.
 */
import { combineEpics } from 'redux-observable';
import { getQuizEpic, listIndexQuizEpic } from './QuizEpic';
export default combineEpics(
    getQuizEpic,
    listIndexQuizEpic
);
