import './styles.css';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import { LoginAppStates } from '../../Constants';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const ForgotPasswordComponent = () => {
  const userDetails = useSelector((state: any) => state.commonStore.userDetails);
  const loader = useSelector((state: any) => state.commonStore.loader);
  const dispatch = useDispatch();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isUsernameValidated, setIsUsernameValidated] = useState<boolean>(false);
  const username = userDetails?.username;
  const dob = userDetails?.dateOfBirth;

  const handleNextClick = async () => {
    if (!username || isValidating || loader) return;
    setIsValidating(true);
    dispatch(
      ACTIONS.checkUser({
        username,
        successCallback: () => setIsUsernameValidated(true),
        finalCallback: () => setIsValidating(false),
      }),
    );
  };

  const handleDOBChange = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLInputElement;
    const date = element.value;
    const isBeforeToday =
      new Date(new Date().toDateString()).getTime() - new Date(date).getTime() > 0;
    if (!date || isBeforeToday) {
      element.classList.remove('error');
      dispatch(ACTIONS.updateUserDetails({ ...userDetails, dateOfBirth: date }));
    } else {
      element.classList.add('error');
      dispatch(ACTIONS.updateUserDetails({ ...userDetails, dateOfBirth: '' }));
    }
  };

  const validateUser = async () => {
    if (!dob || isValidating) return;
    setIsValidating(true);
    dispatch(
      ACTIONS.checkUser({
        username,
        dob,
        successCallback: () =>
          dispatch(ACTIONS.updateAppState(LoginAppStates.CHANGE_PASSWORD)),
        finalCallback: () => setIsValidating(false),
      }),
    );
  };

  return (
    <div className="loginContentContainer forgotPasswordContainer">
      <div className="loginContentDiv forgotPasswordDiv">
        <h1>
          {isUsernameValidated
            ? 'Validate your account'
            : 'Find your Twitter account'}
        </h1>
        <div className="signUpText fogotPassText">
          <span>
            Enter the email, phone number, or username associated with your account
            to change your password.
          </span>
        </div>
        <TextField
          disabled={isUsernameValidated}
          placeholder="Phone, email or username"
          value={username}
          onChange={(e: React.KeyboardEvent<HTMLElement>) =>
            dispatch(
              ACTIONS.updateUserDetails({
                ...userDetails,
                username: (e.target as HTMLInputElement).value,
              }),
            )
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter' && !loader) handleNextClick();
          }}
        />
        {isUsernameValidated && (
          <>
            <div className="signUpText fogotPassText">
              <span>
                Enter date of birth associated with your account for validation.
              </span>
            </div>
            <TextField
              placeholder="Date of birth"
              type="text"
              onFocus={(e: React.MouseEvent<HTMLElement>) => {
                (e.target as HTMLInputElement).type = 'date';
              }}
              onBlur={(e: React.MouseEvent<HTMLElement>) => {
                if ((e.target as HTMLInputElement).value === '')
                  (e.target as HTMLInputElement).type = 'text';
              }}
              onChange={handleDOBChange}
              onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                if (e.key === 'Enter' && !loader) validateUser();
              }}
            />
          </>
        )}
        <div className="actionsDiv">
          {isUsernameValidated && (
            <Button
              label="Back"
              lableClass="btnLabel loginLabel"
              className="btn2 btn3 nextBtn"
              onClick={() => setIsUsernameValidated(false)}
            />
          )}
          <Button
            label="Next"
            lableClass="btnLabel loginLabel"
            className="btn2 nextBtn"
            onClick={isUsernameValidated ? validateUser : handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
