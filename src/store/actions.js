import * as TYPES from "./actionConstants"

export const updateAppState = (payload) => {
    return {
        type: TYPES.UPDATE_APP_STATE,
        payload
    }
};

export const updateUserDetails = (payload) => {
    return {
        type: TYPES.UPDATE_USER_DETAILS,
        payload
    }
};

export const updateIsAuthorized = (payload) => {
    return {
        type: TYPES.UPDATE_IS_AUTHORIZED,
        payload
    }
};

export const updateLoaderState = (payload) => {
    return {
        type: TYPES.CHANGE_LOADER_STATE,
        payload
    }
};

export const logoutHandler = () => {
    return {
        type: TYPES.LOGOUT_HANDLER
    }
};