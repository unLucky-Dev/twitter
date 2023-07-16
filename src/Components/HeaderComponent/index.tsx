import React, { useContext } from 'react';
import CloseIcon from '../../Icons/CloseIcon';
import TwitterLogo from '../../Icons/TwitterLogo';
import Context from '../../store/context';
import './styles.css';
import { LoginAppStates } from '../../Constants/constants';

const HeaderComponent = () => {
  const { changeAppState } = useContext(Context);
  return (
    <div className='loginHeader'>
      <div className='closeIconDiv'>
        <CloseIcon fill='white' cursor='pointer' onClick={() => changeAppState(LoginAppStates.LOGIN)} />
      </div>
      <div className='logoDiv'>
        <TwitterLogo fill='#d6d9db' />
      </div>
    </div>
  )
}

export default HeaderComponent;
