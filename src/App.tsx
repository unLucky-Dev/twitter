/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
import LoginComponent from './Components/LoginComponent';
import SignupComponent from './Components/SignupComponent';
import { LoginAppStates, toastTypes } from './Constants/constants';
import Context from './store/context';
import CreateAccountComponent from './Components/CreateAccountComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPasswordComponent from './Components/LoginPasswordComponent';
import ForgotPasswordComponent from './Components/ForgotPasswordComponent';
import ChangePasswordComponent from './Components/ChangePasswordComponent';
import showMessageToast from './Components/ToastMessage/toastMessage';
import { validateUser } from './api/twitterService';
import UserProfileComponent from './Components/UserProfileComponent';

function App() {
  const [state, setState] = React.useState<string>('');
  const [userDetails, setUserDetails] = React.useState<any>({});
  const [isUserAuthorized, setIsUserAuthorized] = React.useState<boolean>(false);
  const [loader, showLoader] = React.useState<boolean>(false);

  const changeAppState = (appState) => {
    if (![LoginAppStates.LOGIN_PASSWORD, LoginAppStates.CHANGE_PASSWORD, LoginAppStates.FORGOT_PASSWORD].includes(appState) && !isUserAuthorized) {
      setUserDetails({ ...userDetails, username: '' });
    }
    setState(appState);
  };

  const logOutHandler = () => {
    setUserDetails({});
    setIsUserAuthorized(false);
    localStorage.clear();
    changeAppState(LoginAppStates.LOGIN);
  }


  const isValidateUser = async (username, password) => {
    showLoader(true);
    try {
      const response: any = await validateUser({ username, password });
      if (response?.status === 200) {
        setIsUserAuthorized(true);
        setUserDetails(response.data);
      }
      else
        throw new Error('Unauthorized');
    }
    catch (e) {
      localStorage.clear();
      showMessageToast(toastTypes.INFO, 'Please login to continue.');
      changeAppState(LoginAppStates.LOGIN);
    }
    finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!isUserAuthorized && username && password) {
      isValidateUser(username, password);
    }
    else
      changeAppState(LoginAppStates.LOGIN);
  }, [isUserAuthorized]);

  return (
    <div className='root'>
      <Context.Provider value={{ changeAppState, userDetails, setUserDetails, setIsUserAuthorized, logOutHandler, showLoader }}>
        {
          Object.values(LoginAppStates).includes(state) && !isUserAuthorized && <div className='loginSignupDiv'>
            <HeaderComponent />
            {state === LoginAppStates.LOGIN && <LoginComponent />}
            {state === LoginAppStates.LOGIN_PASSWORD && <LoginPasswordComponent />}
            {state === LoginAppStates.SIGNUP && <SignupComponent />}
            {state === LoginAppStates.CREATE_ACCOUNT && <CreateAccountComponent />}
            {state === LoginAppStates.FORGOT_PASSWORD && <ForgotPasswordComponent />}
            {state === LoginAppStates.CHANGE_PASSWORD && <ChangePasswordComponent />}
          </div>
        }
        {
          isUserAuthorized && <div className='root authorizedUser'>
            <UserProfileComponent />
          </div>
        }
      </Context.Provider>
      <ToastContainer />
      {loader && <div className='loaderDiv'><img src={require('./Icons/Loader.gif')} height='32px' alt='loader' /></div>}
    </div>
  );
}

export default App;