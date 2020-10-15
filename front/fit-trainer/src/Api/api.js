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