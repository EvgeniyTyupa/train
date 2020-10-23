import { storeApi } from "../Api/api";
import history from '../Utils/history';

const SET_WORKOUTS_DATA = 'SET_WORKOUTS_DATA';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_IS_FORM_SUCCESS = 'SET_IS_FORM_SUCCESS'; 
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE'; 
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_SELECTED_WORKOUT_ID = 'SET_SELECTED_WORKOUT_ID';
const SET_IS_HAVE_WORKOUT = 'SET_IS_HAVE_WORKOUT';

let initialState = {
    workouts: [],
    isFetching: false,
    serverMessage: null,
    isFormSuccess: false,
    selectedDate: null,
    selectedWorkoutId: null,
    isHaveWorkout: false
}

export const workoutReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_WORKOUTS_DATA: {
            return { ...state, workouts: action.workouts }
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
        case SET_SELECTED_DATE: {
            return { ...state, selectedDate: action.selectedDate }
        }
        case SET_SELECTED_WORKOUT_ID: {
            return { ...state, selectedWorkoutId: action.selectedWorkoutId }
        }
        case SET_IS_HAVE_WORKOUT: {
            return { ...state, isHaveWorkout: action.isHaveWorkout }
        }
        default: 
            return state;
    }
}

export const setWorkoutsData = (workouts) => ({
    type: SET_WORKOUTS_DATA, workouts
});
export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setServerMessage = (serverMessage) => ({
    type: SET_SERVER_MESSAGE, serverMessage
});
export const setIsFormSuccess = (isFormSuccess) => ({
    type: SET_IS_FORM_SUCCESS, isFormSuccess
});
export const setSelectedDate = (selectedDate) => ({
    type: SET_SELECTED_DATE, selectedDate
});
export const setSelectedWorkoutId = (selectedWorkoutId) => ({
    type: SET_SELECTED_WORKOUT_ID, selectedWorkoutId
});
export const setIsHaveWorkout = (isHaveWorkout) => ({
    type: SET_IS_HAVE_WORKOUT, isHaveWorkout
})


export const getWorkouts = (userId) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.getWorkouts(userId)
        .then(data => {
            dispatch([setWorkoutsData(data.workouts), setIsFetching(false)]);
        })
        .catch(err => {
            dispatch(setIsFetching(false));
            console.log(err);
        })
    }
}

export const addWorkout = (userId, exercises, date) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.addWorkout(userId, exercises, date)
        .then(data => {
            dispatch(setIsFetching(false), setIsFormSuccess(true));
            history.push("/dashboard");
        })
        .catch(err => {
            dispatch(setIsFetching(false));
            console.log(err);
        })
    }
}

export const updateWorkout = (work_id, exercises) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        storeApi.updateWorkout(work_id, exercises)
        .then(data => {
            dispatch(setIsFetching(false), setIsFormSuccess(true));
        })
        .catch(err => {
            dispatch(setIsFetching(false));
            console.log(err);
        })
    }
}

