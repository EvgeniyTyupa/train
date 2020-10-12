import { userApi } from '../Api/api';
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

let initialState = {
    userData: null,
    isFetching: false,
}

let userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_USER_DATA: {
            return { ...state, userData: action.userData }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
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
})

export const login = (email, password) => {
    return(dispatch) => {
        dispatch(setIsFetching(true));
        userApi.login(email, password)
        .then(data => {
            dispatch(setAuthUserData(data));
            dispatch(setIsFetching(false));
        })
    }
    
} 

export default userReducer;