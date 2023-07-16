import './styles.css';
import Button from '../Button';
import TextField from '../TextField';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { LoginAppStates, toastTypes } from '../../Constants/constants';
import { updatePassword } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React from 'react';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';

const ChangePasswordComponent = () => {
    const { changeAppState, userDetails, showLoader } = useContext(Context);
    const [password, setPassword] = useState('');
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confPassword, setConfPassword] = useState('');
    const isSubmitDisabled = isSubmitBtnDisabled || password !== confPassword || !password || password.length < 8;
    const { username, dob } = userDetails;

    const handleFinish = async () => {
        setIsSubmitBtnDisabled(true);
        showLoader(true);
        try {
            const response: any = await updatePassword({ username, password, dob });
            if (response?.status === 200) {
                showMessageToast(toastTypes.SUCCESS, `${response.data} Login to continue.`);
                changeAppState(LoginAppStates.LOGIN);
            }
            else if (response?.status === 404) {
                showMessageToast(toastTypes.ERROR, response.error);
                changeAppState(LoginAppStates.FORGOT_PASSWORD);
            }
            else
                showMessageToast(toastTypes.ERROR, response.error ?? 'Something went wrong. Please try again.');
        }
        catch (e) {
            showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
            console.log('error in handleSignUp', e);
        }
        finally {
            setIsSubmitBtnDisabled(false);
            showLoader(false);
        }
    }

    const handleChangePassword = (e) => {
        const enteredPassword = e.target.value;
        if (confPassword && enteredPassword !== confPassword)
            document.getElementById('confirmPassInput')?.classList.add('error');
        else
            document.getElementById('confirmPassInput')?.classList.remove('error');

        if (enteredPassword && enteredPassword.length >= 8)
            e.target?.classList.remove('error');
        else if (enteredPassword && enteredPassword.length < 8)
            e.target?.classList.add('error');

        setPassword(enteredPassword);
    }

    const handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        if (confirmPassword !== password)
            e.target.classList.add('error');
        else
            e.target.classList.remove('error');
        setConfPassword(confirmPassword);
    }

    const inputFieldIcon = (value, changeState) => {
        if (value)
            return <HidePassword className='textFieldIcon' cursor='pointer' onClick={() => changeState(false)} />
        if (!value)
            return <ShowPassword className='textFieldIcon' cursor='pointer' onClick={() => changeState(true)} />
    }

    return (
        <div className='loginContentContainer loginPasswordContainer'>
            <div className='loginContentDiv loginPasswordDiv'>
                <h1>Choose a new password</h1>
                <div className='signUpText fogotPassText'>
                    <span>Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a strong password.</span>
                </div>
                <TextField
                    placeholder='Enter a new password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChangePassword}
                    icon={() => inputFieldIcon(showPassword, setShowPassword)}
                />
                <TextField
                    id='confirmPassInput'
                    placeholder='Confirm your password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmPassword}
                    icon={() => inputFieldIcon(showConfirmPassword, setShowConfirmPassword)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !isSubmitDisabled) handleFinish(); }}
                />
                <Button label='Change Password' lableClass='btnLabel' className='btn2 changePassBtn' disabled={isSubmitDisabled} onClick={handleFinish} />
            </div>
        </div>
    );
}

export default ChangePasswordComponent;
