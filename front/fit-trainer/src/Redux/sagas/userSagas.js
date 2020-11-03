import { takeLatest, put, take } from "redux-saga/effects";
import { userApi } from '../../Api/api';
import { stopSubmit } from 'redux-form';

import {
    LOGIN_USER,
    REGISTER_USER,
    VERIFY_USER,
    LOGOUT,
    GET_PROFILE,
    SET_IS_FETCHING,
    SET_IS_AUTH,
    SET_AUTH_USER_DATA,
    SET_IS_START_DATA,
    SET_SERVER_MESSAGE,
    SET_IS_SHOW_MODAL,
    SET_EXERCISES_DATA,
    SET_WORKOUTS_DATA
} from '../actions/types';

const login = function* ({email, password}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield userApi.login(email, password); 
        yield console.log(response);
        yield localStorage.setItem('usertoken', response.token);
        yield put({type: SET_IS_AUTH, isAuth: true });
    }catch(err){
        console.log(err);
        let error = err.response.data.message ? err.response.data.message : err.message;
        yield put(stopSubmit('login', {_error: error}));
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

const register = function* ({email, password}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield userApi.register(email, password);
        yield console.log('activation link: ' + response.link);
        yield console.log('code: ' + response.code);
        yield put({type: SET_SERVER_MESSAGE, serverMessage: response.message});
        yield put({type: SET_IS_SHOW_MODAL, isShowModal: true});
    }catch(err){
        let error = err.response.data.message ? err.response.data.message : err.message
        yield put(stopSubmit('register', {_error: error}));
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

const getProfile = function* (){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield userApi.me();
        let _id = response._id;
        let email = response.email;
        let verified = response.verified;
        let image = response.image;
        let exercises = response.exercises;
        let workouts = response.workouts;

        yield put({type: SET_AUTH_USER_DATA, userData: {
            _id, email, verified, image
        }});
        yield put({type: SET_EXERCISES_DATA, exercises});
        yield put({type: SET_IS_AUTH, isAuth: true });
        yield put({type: SET_IS_START_DATA, isStartData: true});
        yield put({type: SET_WORKOUTS_DATA, workouts});
    }catch(err){
        yield put({type: SET_SERVER_MESSAGE, serverMessage: err.message});
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }  
}

const verify = function*({email, verification_code}){
    try{
        yield put({type: SET_IS_FETCHING, isFetching: true});
        const response = yield userApi.verify(email, verification_code);
        yield localStorage.setItem('usertoken', response.token);
        yield put({type: SET_IS_AUTH, isAuth: true});
        yield put({type: SET_SERVER_MESSAGE, serverMessage: response.message});
    }catch(err){
        let error = err.response.data.message ? err.response.data.message : err.message
        yield put(stopSubmit('verify', {_error: error}));
    }finally{
        yield put({type: SET_IS_FETCHING, isFetching: false});
    }
}

const logout = function*(){
        yield put({type: SET_IS_AUTH, isAuth: false});
        yield put({type: SET_AUTH_USER_DATA, userData:{
            _id: null,
            email: null,
            verified: null,
            image: null
        }});
        yield put({type: SET_EXERCISES_DATA, exercises: []});
        yield put({type: SET_WORKOUTS_DATA, workouts: []});
        yield put({type: SET_IS_START_DATA, isStartData: false});
        localStorage.removeItem('usertoken');
}

export default [
    takeLatest(LOGIN_USER, login),
    takeLatest(REGISTER_USER, register),
    takeLatest(VERIFY_USER, verify),
    takeLatest(LOGOUT, logout),
    takeLatest(GET_PROFILE, getProfile)
];