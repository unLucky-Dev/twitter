import * as TYPES from './actionConstants';
import { LoginAppStates } from '../Constants';

const initialState = {
  appState: '',
  userDetails: {
    dateOfBirth: '',
    name: '',
    photo: '',
    username: '',
  },
  isUserAuthorized: false,
  loader: false,
};

const commonStore = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_APP_STATE: {
      const updatedState = { ...state };
      if (
        ![
          LoginAppStates.LOGIN_PASSWORD,
          LoginAppStates.CHANGE_PASSWORD,
          LoginAppStates.FORGOT_PASSWORD,
        ].includes(action.payload) &&
        !state.isUserAuthorized
      ) {
        updatedState.userDetails = { ...state.userDetails, username: '' };
      }

      updatedState.appState = action.payload;
      return {
        ...updatedState,
      };
    }
    case TYPES.UPDATE_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case TYPES.UPDATE_IS_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case TYPES.CHANGE_LOADER_STATE:
      return {
        ...state,
        loader: action.payload,
      };
    case TYPES.LOGOUT_HANDLER: {
      localStorage.clear();
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default commonStore;
