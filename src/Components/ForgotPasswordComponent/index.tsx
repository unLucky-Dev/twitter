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
    const { changeAppState, userDetails, setUserDetails, showLoader, loader } = useContext(Context);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [isUsernameValidated, setIsUsernameValidated] = useState<boolean>(false);
    const username = userDetails?.username;
    const dob = userDetails?.dateOfBirth;

    const handleNextClick = async () => {
        if (!username || isValidating || loader) return;
        showLoader?.(true);
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
            showLoader?.(false);
        }
    }

    const handleDOBChange = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLInputElement;
        const date = element.value;
        const isBeforeToday = (new Date(new Date().toDateString()).getTime() - new Date(date).getTime()) > 0;
        if (!date || isBeforeToday) {
            element.classList.remove('error');
            setUserDetails?.({ ...userDetails, dateOfBirth: date });
        }
        else {
            element.classList.add('error');
            setUserDetails?.({ ...userDetails, dateOfBirth: '' });
        }
    }

    const validateUser = async () => {
        if (!dob || isValidating) return;
        showLoader?.(true);
        try {
            setIsValidating(true);
            const response: any = await checkUser({ username, dob });
            if (response?.status === 200) {
                changeAppState?.(LoginAppStates.CHANGE_PASSWORD);
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
            showLoader?.(false);
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
                    onChange={(e: React.KeyboardEvent<HTMLElement>) => setUserDetails?.({ ...userDetails, username: (e.target as HTMLInputElement).value })}
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => { if (e.key === 'Enter' && !loader) handleNextClick() }}
                />
                {isUsernameValidated &&
                    <>
                        <div className='signUpText fogotPassText'>
                            <span>Enter date of birth associated with your account for validation.</span>
                        </div>
                        <TextField
                            placeholder='Date of birth'
                            type='text'
                            onFocus={(e: React.MouseEvent<HTMLElement>) => { (e.target as HTMLInputElement).type = 'date' }}
                    onBlur={(e: React.MouseEvent<HTMLElement>) => { if ((e.target as HTMLInputElement).value === '') (e.target as HTMLInputElement).type = 'text' }}
                    onChange={handleDOBChange}
                            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => { if (e.key === 'Enter' && !loader) validateUser() }}
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
