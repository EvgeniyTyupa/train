import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("usertoken")}`
    }
});

export const userApi = {
    login(email, password){
        return instance.post(`/auth/login`, {email, password})
        .then(response => response.data);
    },
    register(email, password){
        return instance.post(`auth/register`, {email, password})
        .then(response => response.data);
    },
    me(){
        return instance.get(`auth/me`)
        .then(response => response.data);
    },
    verify(email, verification_code){
        return instance.patch(`auth/verify`, {email, verification_code})
        .then(response => response.data);
    }
}

export const storeApi = {
    // EXERCISES
    getExercises(userId){
        return instance.get(`exercise/${userId}`)
        .then(response => response.data);
    },
    addExercise(userId, title, measurement){
        return instance.post(`exercise/${userId}`, {title, measurement})
        .then(response => response.data);
    },
    updateExercises(exercises){
        return instance.patch(`exercise/`, {exercises})
        .then(response => response.data);
    },
    deleteExercise(ex_id){
        return instance.delete(`exercise/${ex_id}`)
        .then(response => response.data);
    },

    // WORKOUTS
    getWorkouts(userId){
        return instance.get(`workout/${userId}`)
        .then(response => response.data);
    },
    addWorkout(userId, exercises, date){
        return instance.post(`workout/${userId}`, {exercises, date})
        .then(response => response.data);
    },
    updateWorkout(userId, exercises){
        return instance.patch(`workout/${userId}`, exercises)
        .then(response => response.data);
    },


}