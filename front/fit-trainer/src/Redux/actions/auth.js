import { 
    LOGIN_USER,
    SET_IS_AUTH,
    SET_AUTH_USER_DATA,
    SET_IS_START_DATA,
    REGISTER_USER,
    VERIFY_USER,
    GET_PROFILE,
    LOGOUT
} from "./types";

export const login = (email, password) => ({
    type: LOGIN_USER, email, password
});
export const register = (email, password) => ({
    type: REGISTER_USER, email, password
});
export const verify = (email, verification_code) => ({
    type: VERIFY_USER, email, verification_code
});
export const getProfile = () => ({
    type: GET_PROFILE
});
export const logout = () => ({
    type: LOGOUT
})

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH, isAuth
});

export const setAuthUserData = (userData) => ({
    type: SET_AUTH_USER_DATA,
    userData: {
        _id: userData._id,
        email: userData.email,
        verified: userData.verified, 
        image: userData.image
    }
});

export const setIsStartData = (isStartData) => ({
    type: SET_IS_START_DATA, isStartData
});





