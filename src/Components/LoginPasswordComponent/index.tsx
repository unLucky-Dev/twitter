import './styles.css';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import { LoginAppStates, toastTypes } from '../../Constants';
import { validateUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React, { useState } from 'react';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const LoginPasswordComponent = () => {
    const userDetails = useSelector((state: any) => state.commonStore.userDetails);
    const loader = useSelector((state: any) => state.commonStore.loader);
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>('');
    const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState(false);
    const username: string = userDetails?.username ?? '';

    const handleLogin = async () => {
        setIsLoginDisabled(true);
        dispatch(ACTIONS.updateLoaderState(true));
        try {
            const response: any = await validateUser({ username, password });
            if (response?.status === 200) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                dispatch(ACTIONS.updateUserDetails(response.data));
                dispatch(ACTIONS.updateIsAuthorized(true));
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
            setIsLoginDisabled(false);
            dispatch(ACTIONS.updateLoaderState(false));
        }
    }

    const handleChangePassword = (e) => {
        const enteredPassword = e.target.value;
        if (enteredPassword) setIsLoginDisabled(false);
        else setIsLoginDisabled(true);
        setPassword(enteredPassword);
    }

    const inputFieldIcon = () => {
        if (showPassword)
            return <HidePassword className='textFieldIcon' cursor='pointer' onClick={() => setShowPassword(false)} />
        if (!showPassword)
            return <ShowPassword className='textFieldIcon' cursor='pointer' onClick={() => setShowPassword(true)} />
    }

    return (
        <div className='loginContentContainer loginPasswordContainer'>
            <div className='loginContentDiv loginPasswordDiv'>
                <h1>Enter your password</h1>
                <TextField
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChangePassword}
                    icon={inputFieldIcon}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !loader && !isLoginDisabled) handleLogin() }}
                    disabled={loader}
                />
                <span className='forgotPasswordAction' onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.FORGOT_PASSWORD))}>Forgot password?</span>
                <Button label='Log in' lableClass='btnLabel loginLabel' className='btn2 loginBtn' disabled={isLoginDisabled} onClick={handleLogin} />
                <div className='signUpText signUp2'>
                    <span>Don't have an account?</span>
                    &nbsp;
                    <span className='signUpAction' onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.SIGNUP))}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default LoginPasswordComponent;
