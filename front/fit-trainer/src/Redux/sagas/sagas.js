import { all } from 'redux-saga/effects';
import user from './userSagas';
import exercise from './exerciseSagas';
import workout from "./workoutSagas";


function* rootSaga(){
    return yield all([...user, ...exercise, ...workout]);
} 

export default rootSaga;