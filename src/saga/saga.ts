import showMessageToast from '../Components/ToastMessage/toastMessage';
import { LoginAppStates, toastTypes } from '../Constants';
import * as ACTIONS from '../store/actions';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as twitterService from '../api/twitterService';
import * as CONSTANTS from '../store/actionConstants';

function* validateUser(action: any) {
  const { username, password } = action.payload;
  yield put(ACTIONS.updateLoaderState(true));
  try {
    const response: any = yield call(twitterService.validateUser, {
      username,
      password,
    });
    if (response?.status === 200) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      yield put(ACTIONS.updateIsAuthorized(true));
      yield put(ACTIONS.updateUserDetails(response.data));
    } else if (response?.status === 404)
      showMessageToast(toastTypes.ERROR, response.error);
    else
      showMessageToast(
        toastTypes.ERROR,
        response.error ?? 'Something went wrong. Please try again.',
      );
  } catch (e) {
    localStorage.clear();
    showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
    showMessageToast(toastTypes.INFO, 'Please login to continue.');
    console.log('error in validateUser', e);
    yield put(ACTIONS.updateAppState(LoginAppStates.LOGIN));
  } finally {
    action.payload.finalCallback?.();
    yield put(ACTIONS.updateLoaderState(false));
  }
}

function* checkUser(action: any) {
  yield put(ACTIONS.updateLoaderState(true));
  const { username } = action.payload;
  try {
    const response: any = yield call(twitterService.checkUser, { username });
    if (response?.status === 200) action.payload.successCallback?.();
    else if (response?.status === 404)
      showMessageToast(toastTypes.ERROR, response.error);
    else
      showMessageToast(
        toastTypes.ERROR,
        response.error ?? 'Something went wrong. Please try again.',
      );
  } catch (e) {
    showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
    console.log('error in checkUser', e);
  } finally {
    action.payload.finalCallback?.();
    yield put(ACTIONS.updateLoaderState(false));
  }
}

function* changePassword(action: any) {
  yield put(ACTIONS.updateLoaderState(true));
  const { username, password, dob } = action.payload;
  try {
    const response: any = yield call(twitterService.updatePassword, {
      username,
      password,
      dob,
    });
    if (response?.status === 200) {
      showMessageToast(toastTypes.SUCCESS, `${response.data} Login to continue.`);
      yield put(ACTIONS.updateAppState(LoginAppStates.LOGIN));
    } else if (response?.status === 404) {
      showMessageToast(toastTypes.ERROR, response.error);
      yield put(ACTIONS.updateAppState(LoginAppStates.FORGOT_PASSWORD));
    } else
      showMessageToast(
        toastTypes.ERROR,
        response.error ?? 'Something went wrong. Please try again.',
      );
  } catch (e) {
    showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
    console.log('error in changePassword', e);
  } finally {
    action.payload.finalCallback?.();
    yield put(ACTIONS.updateLoaderState(false));
  }
}

function* createUser(action: any) {
  yield put(ACTIONS.updateLoaderState(true));
  showMessageToast(toastTypes.INFO, 'Creating Account...', 200);
  const { name, username: phone, dob, password, profileImage } = action.payload;
  try {
    const response: any = yield call(twitterService.addUser, {
      name,
      username: phone,
      dob,
      password,
      profileImage,
    });
    if (response?.status === 201) {
      showMessageToast(
        toastTypes.SUCCESS,
        'Account created successfully. Login to Continue.',
        500,
      );
      yield put(ACTIONS.updateAppState(LoginAppStates.LOGIN));
    } else if (response?.status === 413)
      showMessageToast(toastTypes.ERROR, 'Image size is too large.');
    else
      showMessageToast(
        toastTypes.ERROR,
        response.error ?? 'Something went wrong. Please try again.',
      );
  } catch (e) {
    showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
    console.log('error in handleSignUp', e);
  } finally {
    yield put(ACTIONS.updateLoaderState(false));
  }
}

export default function* twitterSeviceWatcher() {
  yield takeLatest(CONSTANTS.VALIDATE_USER, validateUser);
  yield takeLatest(CONSTANTS.CHECK_USER, checkUser);
  yield takeLatest(CONSTANTS.CHANGE_PASSWORD, changePassword);
  yield takeLatest(CONSTANTS.CREATE_USER, createUser);
}
