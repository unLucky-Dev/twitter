import * as TYPES from "./actionConstants"

export const updateAppState = (payload) => ({
    type: TYPES.UPDATE_APP_STATE,
    payload
});

export const updateUserDetails = (payload) => ({
    type: TYPES.UPDATE_USER_DETAILS,
    payload
});

export const updateIsAuthorized = (payload) => ({
    type: TYPES.UPDATE_IS_AUTHORIZED,
    payload
});

export const updateLoaderState = (payload) => ({
    type: TYPES.CHANGE_LOADER_STATE,
    payload
});

export const logoutHandler = () => ({
    type: TYPES.LOGOUT_HANDLER
});

export const validateUser = (payload) => ({
    type: TYPES.VALIDATE_USER,
    payload
});

export const checkUser = (payload) => ({
    type: TYPES.CHECK_USER,
    payload
});

export const changePassword = (payload) => ({
    type: TYPES.CHANGE_PASSWORD,
    payload
});

export const createUser = (payload) => ({
    type: TYPES.CREATE_USER,
    payload
});