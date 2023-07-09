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

function App() {
  const [state, setState] = React.useState<string>(AppStates.LOGIN);
  const [username, setUsername] = React.useState<string>('');

  const changeAppState = (appState) => {
    if (appState !== AppStates.LOGIN_PASSWORD)
      setUsername('');
    setState(appState);
  }

  return (
    <div className='root'>
      <div className='loginSignupDiv'>
        <Context.Provider value={{ changeAppState, setUsername, username }}>
          <HeaderComponent />
          {state === AppStates.LOGIN && <LoginComponent />}
          {state === AppStates.LOGIN_PASSWORD && <LoginPasswordComponent />}
          {state === AppStates.SIGNUP && <SignupComponent />}
          {state === AppStates.CREATE_ACCOUNT && <CreateAccountComponent />}
        </Context.Provider>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;








// issue 1 -> open choose file & close without choosing
//issue 2 -> cannot post base64 in payload