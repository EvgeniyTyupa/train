import { SET_IS_FETCHING, SET_IS_FORM_SUCCESS, SET_IS_SHOW_MODAL, SET_SERVER_MESSAGE } from "../actions/types";

let initialState = {
    isFetching: false,
    isFormSuccess: false,
    serverMessage: null,
    isShowModal: false
}

export const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_SERVER_MESSAGE: {
            return { ...state, serverMessage: action.serverMessage }
        }
        case SET_IS_FORM_SUCCESS: {
            return { ...state, isFormSuccess: action.isFormSuccess }
        }
        case SET_IS_SHOW_MODAL: {
            return { ...state, isShowModal: action.isShowModal }
        }
        default:
            return state;
    }
}
