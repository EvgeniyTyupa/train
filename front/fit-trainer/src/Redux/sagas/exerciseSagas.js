import { takeLatest, put, take } from "redux-saga/effects";
import { stopSubmit } from 'redux-form';
import { storeApi } from "../../Api/api";

import { 
    ADD_EXERCISE,
    DELETE_EXERCISE,
    GET_EXERCISES,
    SET_EXERCISES_DATA,
    SET_IS_FETCHING,
    SET_IS_FORM_SUCCESS,
    SET_SERVER_MESSAGE,
    UPDATE_EXERCISES
} from "../actions/types";

const getExercises = function*(userId){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield storeApi.getExercises(userId);
        yield put({type: SET_EXERCISES_DATA, exercises: response.exercises});
    }catch(err){
        yield put({type: SET_SERVER_MESSAGE, serverMessage: err.message});
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}
const addExercise = function*({userId, title, measurement}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        yield storeApi.addExercise(userId, title, measurement);
        yield put({type: SET_IS_FORM_SUCCESS, isFormSuccess: true});
    }catch(err){
        let error = err.response.data.message ? err.response.data.message : err.message;
        yield put(stopSubmit('addEx', {_error: error}));
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
} 
const updateExercises = function*(exercises){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = storeApi.updateExercises(exercises);
        yield put({type: SET_EXERCISES_DATA, exercises: response.exercises});
    }catch(err){
        yield console.log(err);
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}
const deleteExercise = function*(ex_id){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        yield storeApi.deleteExercise(ex_id);
    }catch(err){
        yield console.log(err);
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

export default [
    takeLatest(GET_EXERCISES, getExercises),
    takeLatest(ADD_EXERCISE, addExercise),
    takeLatest(UPDATE_EXERCISES, updateExercises),
    takeLatest(DELETE_EXERCISE, deleteExercise)
];