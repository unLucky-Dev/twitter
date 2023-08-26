import './styles.css';
import GoogleLogo from '../../Icons/GoogleLogo';
import AppleLogo from '../../Icons/AppleLogo';
import Button from '../Button';
import { LoginAppStates } from '../../Constants';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const SignupComponent = () => {
  document.title = 'Sign up for Twitter/Twitter';
  const dispatch = useDispatch();
  return (
    <div className="loginContentContainer">
      <div className="loginContentDiv">
        <h1>Join Twitter today</h1>
        <Button label="Sign in with Google" logo={<GoogleLogo />} />
        <Button
          label="Sign in with Apple"
          logo={<AppleLogo />}
          logoClass="btnLogo2"
          lableClass="btnLabel"
        />
        <div className="orDivider">
          <div className="line" />
          <span>or</span>
          <div className="line" />
        </div>
        <Button
          label="Create account"
          lableClass="btnLabel"
          className="btn2"
          onClick={() =>
            dispatch(ACTIONS.updateAppState(LoginAppStates.CREATE_ACCOUNT))
          }
        />
        <span className="agreementText">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </span>
        <div className="loginText">
          <span>Have an account already?</span>
          &nbsp;
          <span
            className="loginAction"
            onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN))}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
