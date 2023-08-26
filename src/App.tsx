/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
import LoginComponent from './Components/LoginComponent';
import SignupComponent from './Components/SignupComponent';
import { LoginAppStates } from './Constants';
import CreateAccountComponent from './Components/CreateAccountComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPasswordComponent from './Components/LoginPasswordComponent';
import ForgotPasswordComponent from './Components/ForgotPasswordComponent';
import ChangePasswordComponent from './Components/ChangePasswordComponent';
import UserProfileComponent from './Components/UserProfileComponent';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from './store/actions';

function App() {
  const appState = useSelector((state: any) => state.commonStore.appState);
  const isUserAuthorized = useSelector((state: any) => state.commonStore.isUserAuthorized);
  const loader = useSelector((state: any) => state.commonStore.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!isUserAuthorized && username && password)
      dispatch(ACTIONS.validateUser({username, password}));
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