import React from 'react';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
import LoginComponent from './Components/LoginComponent';
import SignupComponent from './Components/SignupComponent';
import { AppStates } from './Constants/constants';
import Context from './store/context';
import CreateAccountComponent from './Components/CreateAccountComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPasswordComponent from './Components/LoginPasswordComponent';
import ForgotPasswordComponent from './Components/ForgotPasswordComponent';
import ChangePasswordComponent from './Components/ChangePasswordComponent';

function App() {
  const [state, setState] = React.useState<string>(AppStates.LOGIN);
  const [username, setUsername] = React.useState<string>('');
  const [dob, setDob] = React.useState<string>('');

  const changeAppState = (appState) => {
    if (![AppStates.LOGIN_PASSWORD, AppStates.CHANGE_PASSWORD, AppStates.FORGOT_PASSWORD].includes(appState))
      setUsername('');
    setState(appState);
  };

  return (
    <div className='root'>
      <div className='loginSignupDiv'>
        <Context.Provider value={{ changeAppState, setUsername, username, dob, setDob }}>
          <HeaderComponent />
          {state === AppStates.LOGIN && <LoginComponent />}
          {state === AppStates.LOGIN_PASSWORD && <LoginPasswordComponent />}
          {state === AppStates.SIGNUP && <SignupComponent />}
          {state === AppStates.CREATE_ACCOUNT && <CreateAccountComponent />}
          {state === AppStates.FORGOT_PASSWORD && <ForgotPasswordComponent />}
          {state === AppStates.CHANGE_PASSWORD && <ChangePasswordComponent />}
        </Context.Provider>
        <ToastContainer />
      </div>
    </div>
  );
}

  export default App;