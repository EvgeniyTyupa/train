import { put, take, takeLatest } from "redux-saga/effects";
import { storeApi } from "../../Api/api";
import history from '../../Utils/history';

import { 
    ADD_WORKOUT, 
    GET_WORKOUTS, 
    SET_IS_FETCHING, 
    SET_IS_FORM_SUCCESS, 
    SET_WORKOUTS_DATA, 
    UPDATE_WORKOUT 
} from "../actions/types";

const getWorkouts = function*(userId){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield storeApi.getWorkouts(userId);
        yield put({type: SET_WORKOUTS_DATA, workouts: response.workouts});
    }catch(err){   
        yield console.log(err);
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
} 

const addWorkout = function* ({userId, exercises, date}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        yield storeApi.addWorkout(userId, exercises, date);
        yield put({type: SET_IS_FORM_SUCCESS, isFormSuccess: true});
        yield history.push("/dashboard");
    }catch(err){
        yield console.log(err);
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

const updateWorkout = function*({work_id, exercises}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        yield storeApi.updateWorkout(work_id, exercises);
        yield put({type: SET_IS_FORM_SUCCESS, isFormSuccess: true});
    }catch(err){
        yield console.log(err);
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

export default [
    takeLatest(GET_WORKOUTS, getWorkouts),
    takeLatest(ADD_WORKOUT, addWorkout),
    takeLatest(UPDATE_WORKOUT, updateWorkout)
];