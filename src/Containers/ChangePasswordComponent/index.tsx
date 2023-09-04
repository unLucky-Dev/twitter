import './styles.css';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import React, { useState } from 'react';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const ChangePasswordComponent = () => {
  const userDetails = useSelector((state: any) => state.commonStore.userDetails);
  const loader = useSelector((state: any) => state.commonStore.loader);
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>('');
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confPassword, setConfPassword] = useState<string>('');
  const isSubmitDisabled =
    isSubmitBtnDisabled ||
    password !== confPassword ||
    !password ||
    password.length < 8;
  const username = userDetails?.username;
  const dob = userDetails?.dateOfBirth;

  const handleFinish = async () => {
    setIsSubmitBtnDisabled(true);
    dispatch(
      ACTIONS.changePassword({
        username,
        password,
        dob,
        finalCallback: () => setIsSubmitBtnDisabled(false),
      }),
    );
  };

  const handleChangePassword = (e: React.KeyboardEvent<HTMLElement>) => {
    const element = e.target as HTMLInputElement;
    const enteredPassword = element.value;
    if (confPassword && enteredPassword !== confPassword)
      document.getElementById('confirmPassInput')?.classList.add('error');
    else document.getElementById('confirmPassInput')?.classList.remove('error');

    if (enteredPassword && enteredPassword.length >= 8)
      element.classList.remove('error');
    else if (enteredPassword && enteredPassword.length < 8)
      element.classList.add('error');

    setPassword(enteredPassword);
  };

  const handleConfirmPassword = (e: React.KeyboardEvent<HTMLElement>) => {
    const element = e.target as HTMLInputElement;
    const confirmPassword = element.value;
    if (confirmPassword !== password) element.classList.add('error');
    else element.classList.remove('error');
    setConfPassword(confirmPassword);
  };

  const inputFieldIcon = (value: boolean, changeState: (state: boolean) => void) => {
    if (value)
      return (
        <HidePassword
          className="textFieldIcon"
          cursor="pointer"
          onClick={() => changeState(false)}
        />
      );
    if (!value)
      return (
        <ShowPassword
          className="textFieldIcon"
          cursor="pointer"
          onClick={() => changeState(true)}
        />
      );
  };

  return (
    <div className="loginContentContainer loginPasswordContainer">
      <div className="loginContentDiv loginPasswordDiv">
        <h1>Choose a new password</h1>
        <div className="signUpText fogotPassText">
          <span>
            Make sure your new password is 8 characters or more. Try including
            numbers, letters, and punctuation marks for a strong password.
          </span>
        </div>
        <TextField
          placeholder="Enter a new password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChangePassword}
          icon={() => inputFieldIcon(showPassword, setShowPassword)}
        />
        <TextField
          id="confirmPassInput"
          placeholder="Confirm your password"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={handleConfirmPassword}
          icon={() => inputFieldIcon(showConfirmPassword, setShowConfirmPassword)}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter' && !loader) handleFinish();
          }}
        />
        <Button
          label="Change Password"
          lableClass="btnLabel"
          className="btn2 changePassBtn"
          disabled={isSubmitDisabled}
          onClick={handleFinish}
        />
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
