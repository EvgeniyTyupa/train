import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export const userApi = {
    login(email, password){
        return instance.post(`/auth/login`, {email, password})
        .then(response => response.data);
    }
}