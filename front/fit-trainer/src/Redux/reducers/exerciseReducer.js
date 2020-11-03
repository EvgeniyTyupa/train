import { 
    SET_EXERCISES_DATA
 } from "../actions/types";

let initialState = {
    exercises: [],
    measurements: ['kilograms', 'time', 'meters']
}

export const exerciseReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_EXERCISES_DATA: {
            return { ...state, exercises: action.exercises }
        }
        default:
            return state;
    }
}