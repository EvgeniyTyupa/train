import { 
    ADD_EXERCISE,
    DELETE_EXERCISE,
    GET_EXERCISES,
    SET_EXERCISES_DATA,
    UPDATE_EXERCISES,
} from "./types";

export const setExercisesData = (exercises) => ({
    type: SET_EXERCISES_DATA, exercises
});
export const getExercises = (userId) => ({
    type: GET_EXERCISES, userId
});
export const addExercise = (userId, title, measurement) => ({
    type: ADD_EXERCISE, userId, title, measurement
});
export const updateExercises = (exercises) => ({
    type: UPDATE_EXERCISES, exercises
});
export const deleteExercise = (ex_id) => ({
    type: DELETE_EXERCISE, ex_id
});