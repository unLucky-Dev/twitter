/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
import LoginComponent from './Components/LoginComponent';
import SignupComponent from './Components/SignupComponent';
import { LoginAppStates, toastTypes } from './Constants';
import CreateAccountComponent from './Components/CreateAccountComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPasswordComponent from './Components/LoginPasswordComponent';
import ForgotPasswordComponent from './Components/ForgotPasswordComponent';
import ChangePasswordComponent from './Components/ChangePasswordComponent';
import showMessageToast from './Components/ToastMessage/toastMessage';
import { validateUser } from './api/twitterService';
import UserProfileComponent from './Components/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from './store/actions';

function App() {
  const appState = useSelector((state: any) => state.commonStore.appState);
  const isUserAuthorized = useSelector((state: any) => state.commonStore.isUserAuthorized);
  const loader = useSelector((state: any) => state.commonStore.loader);

  const dispatch = useDispatch();

  const isValidateUser = async (username: string, password: string) => {
    dispatch(ACTIONS.updateLoaderState(true));
    try {
      const response: any = await validateUser({ username, password });
      if (response?.status === 200) {
        dispatch(ACTIONS.updateIsAuthorized(true));
        dispatch(ACTIONS.updateUserDetails(response.data));
      }
      else
        throw new Error('Unauthorized');
    }
    catch (e) {
      localStorage.clear();
      showMessageToast(toastTypes.INFO, 'Please login to continue.');
      dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN));
    }
    finally {
      dispatch(ACTIONS.updateLoaderState(false));
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!isUserAuthorized && username && password)
      isValidateUser(username, password);
    else
      dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN));
  }, [isUserAuthorized]);

  return (
    <div className='root'>
      {
        Object.values(LoginAppStates).includes(appState) && !isUserAuthorized && <div className='loginSignupDiv'>
          <HeaderComponent />
          {appState === LoginAppStates.LOGIN && <LoginComponent />}
          {appState === LoginAppStates.LOGIN_PASSWORD && <LoginPasswordComponent />}
          {appState === LoginAppStates.CHANGE_PASSWORD && <ChangePasswordComponent />}
          {appState === LoginAppStates.SIGNUP && <SignupComponent />}
          {appState === LoginAppStates.CREATE_ACCOUNT && <CreateAccountComponent />}
          {appState === LoginAppStates.FORGOT_PASSWORD && <ForgotPasswordComponent />}
        </div>
      }
      {
        isUserAuthorized && <div className='root authorizedUser'>
          <UserProfileComponent />
        </div>
      }
      <ToastContainer />
      {loader && <div className='loaderDiv'><img src={require('./Icons/Loader.gif')} height='32px' alt='loader' /></div>}
    </div>
  );
}

export default App;