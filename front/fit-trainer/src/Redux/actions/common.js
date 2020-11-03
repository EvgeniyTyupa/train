import { 
    SET_IS_FETCHING, 
    SET_IS_FORM_SUCCESS, 
    SET_IS_SHOW_MODAL, 
    SET_SERVER_MESSAGE
 } from "./types";

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setServerMessage = (serverMessage) => ({
    type: SET_SERVER_MESSAGE, serverMessage
});
export const setIsShowModal = (isShowModal) => ({
    type: SET_IS_SHOW_MODAL, isShowModal
});
export const setIsFormSuccess = (isFormSuccess) => ({
    type: SET_IS_FORM_SUCCESS, isFormSuccess
})