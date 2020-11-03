import { 
    SET_AUTH_USER_DATA, 
    SET_IS_AUTH
} from "../actions/types";

let initialState = {
    _id: null,
    email: null,
    verified: null,
    image: null,
    serverMessage: null,
    isAuth: false,
    isRedirectAfterSubmit: false,
    isShowModal: false,
    isStartData: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_AUTH: {
            return { ...state, isAuth: action.isAuth }
        }
        case SET_AUTH_USER_DATA: {
            return { ...state, ...action.userData }
        }
        default:
            return state;
    }
}