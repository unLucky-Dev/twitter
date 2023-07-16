import './styles.css';
import Button from '../Button';
import TextField from '../TextField';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { LoginAppStates, toastTypes } from '../../Constants/constants';
import { checkUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React from 'react';

const ForgotPasswordComponent = () => {
    const { changeAppState, userDetails, setUserDetails, showLoader } = useContext(Context);
    const [isValidating, setIsValidating] = useState(false);
    const [isUsernameValidated, setIsUsernameValidated] = useState(false);
    const { username, dob } = userDetails;

    const handleNextClick = async () => {
        if (!username || isValidating) return;
        showLoader(true);
        try {
            setIsValidating(true);
            const response: any = await checkUser({ username });
            if (response?.status === 200) {
                setIsUsernameValidated(true);
            }
            else if (response?.status === 404) {
                showMessageToast(toastTypes.ERROR, response.error);
            }
            else
                showMessageToast(toastTypes.ERROR, response.error ?? 'Something went wrong. Please try again.');
        }
        catch (e) {
            showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
            console.log('error in handleSignUp', e);
        }
        finally {
            setIsValidating(false);
            showLoader(false);
        }
    }

    const handleDOBChange = (e) => {
        const date = e.target.value;
        const isBeforeToday = (new Date(new Date().toDateString()).getTime() - new Date(date).getTime()) > 0;
        if (!date || isBeforeToday) {
            e.target.classList.remove('error');
            setUserDetails({ ...userDetails, dob: date });
        }
        else {
            e.target.classList.add('error');
            setUserDetails({ ...userDetails, dob: '' });
        }
    }

    const validateUser = async () => {
        if (!dob || isValidating) return;
        showLoader(true);
        try {
            setIsValidating(true);
            const response: any = await checkUser({ username, dob });
            if (response?.status === 200) {
                changeAppState(LoginAppStates.CHANGE_PASSWORD);
            }
            else if (response?.status === 404) {
                showMessageToast(toastTypes.ERROR, response.error);
            }
            else
                showMessageToast(toastTypes.ERROR, response.error ?? 'Something went wrong. Please try again.');
        }
        catch (e) {
            showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
            console.log('error in handleSignUp', e);
        }
        finally {
            setIsValidating(false);
            showLoader(false);
        }
    }

    return (
        <div className='loginContentContainer forgotPasswordContainer'>
            <div className='loginContentDiv forgotPasswordDiv'>
                <h1>{isUsernameValidated ? 'Validate your account' : 'Find your Twitter account'}</h1>
                <div className='signUpText fogotPassText'>
                    <span>Enter the email, phone number, or username associated with your account to change your password.</span>
                </div>
                <TextField
                    disabled={isUsernameValidated}
                    placeholder='Phone, email or username'
                    value={username}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNextClick() }}
                />
                {isUsernameValidated &&
                    <>
                        <div className='signUpText fogotPassText'>
                            <span>Enter date of birth associated with your account for validation.</span>
                        </div>
                        <TextField
                            placeholder='Date of birth'
                            type='text'
                            onFocus={(e) => { e.target.type = 'date' }}
                            onBlur={(e) => { if (e.target.value === '') e.target.type = 'text' }} onChange={handleDOBChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') validateUser() }}
                        /></>}
                <div className='actionsDiv'>
                    {isUsernameValidated && <Button label='Back' lableClass='btnLabel loginLabel' className='btn2 btn3 nextBtn' onClick={() => setIsUsernameValidated(false)} />}
                    <Button label='Next' lableClass='btnLabel loginLabel' className='btn2 nextBtn' onClick={isUsernameValidated ? validateUser : handleNextClick} />
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordComponent;
