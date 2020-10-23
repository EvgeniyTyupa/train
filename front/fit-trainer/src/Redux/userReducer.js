import { userApi } from '../Api/api';
import { stopSubmit } from 'redux-form';
import { setExercisesData } from './exerciseReducer';
import { setWorkoutsData } from './workoutReducer';
import history from '../Utils/history';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_IS_REDIRECT_AFTER_SUBMIT = 'SET_IS_REDIRECT_AFTER_SUBMIT';
const SET_IS_SHOW_MODAL = 'SET_IS_SHOW_MODAL';
const SET_IS_START_DATA = 'SET_IS_START_DATA';

let initialState = {
    _id: null,
    email: null,
    verified: null,
    image: null,
    serverMessage: null,
    isFetching: false,
    isAuth: false,
    isRedirectAfterSubmit: false,
    isShowModal: false,
    isStartData: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_USER_DATA: {
            return { ...state, ...action.userData }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_SERVER_MESSAGE: {
            return { ...state, serverMessage: action.serverMessage }
        }
        case SET_IS_AUTH: {
            return { ...state, isAuth: action.isAuth }
        }
        case SET_IS_REDIRECT_AFTER_SUBMIT: {
            return { ...state, isRedirectAfterSubmit: action.isRedirectAfterSubmit }
        }
        case SET_IS_SHOW_MODAL: {
            return { ...state, isShowModal: action.isShowModal }
        }
        case SET_IS_START_DATA: {
            return { ...state, isStartData: action.isStartData }
        }
        default:
            return state
    }
}

export const setAuthUserData = (_id, email, verified, image) => ({
    type: SET_AUTH_USER_DATA, 
    userData:{
        _id, email, verified, image
    }
});
export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setServerMessage = (serverMessage) => ({
    type: SET_SERVER_MESSAGE, serverMessage
});
export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH, isAuth
});
export const setIsRedirectAfterSubmit = (isRedirectAfterSubmit) => ({
    type: SET_IS_REDIRECT_AFTER_SUBMIT, isRedirectAfterSubmit
});
export const setIsShowModal = (isShowModal) => ({
    type: SET_IS_SHOW_MODAL, isShowModal
});
export const setIsStartData = (isStartData) => ({
    type: SET_IS_START_DATA, isStartData
});

export const login = (email, password) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.login(email, password)
        .then(data => {
            localStorage.setItem('usertoken', data.token);
            dispatch([setIsAuth(true), setIsFetching(false)]);
        })
        .catch(err => {
            console.log({err});
            dispatch(setIsFetching(false));
            let error = err.response.data.message ? err.response.data.message : err.message
            dispatch(stopSubmit('login', {_error: error}));
        });
    }
} 

export const register = (email, password) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.register(email, password)
        .then(data => {
            console.log('activation link: ' + data.link);
            console.log('code: ' + data.code);
            dispatch([setServerMessage(data.message), setIsShowModal(true), setIsFetching(false)]);
        })
        .catch(err => {
            dispatch(setIsFetching(false));
            let error = err.response.data.message ? err.response.data.message : err.message
            dispatch(stopSubmit('register', {_error: error}));
        });
    }
}
export const getProfile = () => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.me()
        .then(data => {
            let _id = data._id;
            let email = data.email;
            let verified = data.verified;
            let image = data.image;
            let exercises = data.exercises;
            let workouts = data.workouts
            dispatch([setAuthUserData(_id, email, verified, image), setIsAuth(true), setIsStartData(true), setIsFetching(false)]);
            dispatch([setExercisesData(exercises), setWorkoutsData(workouts)]);
        })
        .catch(err => {
            dispatch([setServerMessage(err.message), setIsFetching(false)]);
        });
    }
}

export const verify = (email, verification_code) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.verify(email, verification_code)
        .then(data => {
            localStorage.setItem('usertoken', data.token);
            dispatch([setIsAuth(true), setServerMessage(data.message), setIsFetching(false)]);
        })
        .catch(err => {
            console.log({err});
            dispatch(setIsFetching(false));
            let error = err.response.data.message ? err.response.data.message : err.message
            dispatch(stopSubmit('verify', {_error: error}));
        });
    }
}

export const logout = () => {
    return(dispatch)=>{
        dispatch([setIsAuth(false), setAuthUserData(null, null, null, null, [], []), setIsStartData(false)]);
        localStorage.removeItem('usertoken');
    }
}
