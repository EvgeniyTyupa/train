import { storeApi } from '../Api/api';
import { stopSubmit } from 'redux-form';

const SET_EXERCISES_DATA = 'SET_EXERCISES_DATA'; 
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE';
const SET_IS_FORM_SUCCESS = 'SET_IS_FORM_SUCCESS';

let initialState = {
    exercises: [],
    isFetching: false,
    serverMessage: null,
    measurements: ['kilograms', 'time', 'meters'],
    isFormSuccess: false
}

export const exerciseReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_EXERCISES_DATA: {
            return { ...state, exercises: action.exercises }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_SERVER_MESSAGE: {
            return { ...state, serverMessage: action.serverMessage }
        }
        case SET_IS_FORM_SUCCESS: {
            return { ...state, isFormSuccess: action.isFormSuccess }
        }
        default: 
            return state;
    }
}

export const setExercisesData = (exercises) => ({
    type: SET_EXERCISES_DATA, exercises
});
export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setServerMessage = (serverMessage) => ({
    type: SET_SERVER_MESSAGE, serverMessage
});
export const setIsFormSuccess = (isFormSuccess) => ({
    type: SET_IS_FORM_SUCCESS, isFormSuccess
})

export const getExercises = (userId) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.getExercises(userId)
        .then(data => {
            dispatch([setExercisesData(data.exercises), setIsFetching(false)]);
        })
        .catch(err => {
            dispatch([setServerMessage(err.message), setIsFetching(false)]);
        });
    }
}
export const addExercise = (userId, title, measurement) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.addExercise(userId, title, measurement)
        .then(data => {
            console.log(data);
            dispatch([setIsFetching(false), setIsFormSuccess(true)]);
        })
        .catch(err => {
            console.log({err});
            dispatch(setIsFetching(false));
            let error = err.response.data.message ? err.response.data.message : err.message
            dispatch(stopSubmit('addEx', {_error: error}));
        });
    }
}

export const updateExercises = (exercises) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.updateExercises(exercises)
        .then(data => {
            dispatch([setExercisesData(data.exercises), setIsFetching(false)]);
        });
    }
}

export const deleteExercise = (ex_id) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.deleteExercise(ex_id)
        .then(data => {
            console.log(data);
            dispatch(setIsFetching(false));
        });
    }
}
