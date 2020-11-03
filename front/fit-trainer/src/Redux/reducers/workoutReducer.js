import { SET_IS_HAVE_WORKOUT, SET_SELECTED_DATE, SET_SELECTED_WORKOUT_ID, SET_WORKOUTS_DATA } from "../actions/types";

let initialState = {
    workouts: [],
    selectedDate: null,
    selectedWorkoutId: null,
    isHaveWorkout: false
}

export const workoutReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_WORKOUTS_DATA: {
            return { ...state, workouts: action.workouts }
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