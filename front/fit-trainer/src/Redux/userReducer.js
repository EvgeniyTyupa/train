import { userApi } from '../Api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_IS_REDIRECT_AFTER_SUBMIT = 'SET_IS_REDIRECT_AFTER_SUBMIT';
const SET_IS_SHOW_MODAL = 'SET_IS_SHOW_MODAL';

let initialState = {
    userData: null,
    serverMessage: null,
    isFetching: false,
    isAuth: false,
    exercises: [],
    workouts: [],
    isRedirectAfterSubmit: false,
    isShowModal: false 
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_USER_DATA: {
            return { ...state, userData: action.userData }
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
        default:
            return state
    }
}

export const setAuthUserData = (userData) => ({
    type: SET_AUTH_USER_DATA, userData
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

export const login = (email, password) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.login(email, password)
        .then(data => {
            localStorage.setItem('usertoken', data.token);
            dispatch(setIsAuth(true));
            dispatch(setIsRedirectAfterSubmit(true));
            dispatch(setIsFetching(false));
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
            dispatch(setServerMessage(data.message));
            dispatch(setIsShowModal(true));
            dispatch(setIsFetching(false));
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
            dispatch(setAuthUserData(data));
            dispatch(setIsAuth(true));
            dispatch(setIsFetching(false));
        })
        .catch(err => {
            dispatch(setServerMessage(err.message));
            dispatch(setIsFetching(false));
        });
    }
}

export const verify = (email, verification_code) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.verify(email, verification_code)
        .then(data => {
            dispatch(getProfile());
            dispatch(setServerMessage(data.message));
            dispatch(setIsAuth(true));
            dispatch(setIsRedirectAfterSubmit(true));
            dispatch(setIsFetching(false));
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
        dispatch(setIsAuth(false));
        dispatch(setAuthUserData(null));
        localStorage.removeItem('usertoken');
    }
}
