import React from 'react';
import CloseIcon from '../../Icons/CloseIcon';
import TwitterLogo from '../../Icons/TwitterLogo';
import './styles.css';
import { LoginAppStates } from '../../Constants';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className='loginHeader'>
      <div className='closeIconDiv'>
        <CloseIcon fill='white' cursor='pointer' onClick={() =>
          dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN))} />
      </div>
      <div className='logoDiv'>
        <TwitterLogo fill='#d6d9db' />
      </div>
    </div>
  )
}

export default HeaderComponent;
