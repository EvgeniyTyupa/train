import { 
    ADD_WORKOUT,
    GET_WORKOUTS,
    SET_IS_HAVE_WORKOUT, 
    SET_SELECTED_DATE, 
    SET_SELECTED_WORKOUT_ID, 
    SET_WORKOUTS_DATA, 
    UPDATE_WORKOUT
} from "./types";

export const setWorkoutsData = (workouts) => ({
    type: SET_WORKOUTS_DATA, workouts
});
export const setSelectedDate = (selectedDate) => ({
    type: SET_SELECTED_DATE, selectedDate
});
export const setSelectedWorkoutId = (selectedWorkoutId) => ({
    type: SET_SELECTED_WORKOUT_ID, selectedWorkoutId
});
export const setIsHaveWorkout = (isHaveWorkout) => ({
    type: SET_IS_HAVE_WORKOUT, isHaveWorkout
});
export const getWorkouts = (userId) => ({
    type: GET_WORKOUTS, userId
});
export const addWorkout = (userId, exercises, date) => ({
    type: ADD_WORKOUT, userId, exercises, date
});
export const updateWorkout = (work_id, exercises) => ({
    type: UPDATE_WORKOUT, work_id, exercises
});
