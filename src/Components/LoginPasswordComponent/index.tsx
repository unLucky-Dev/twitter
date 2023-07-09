import './styles.css';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { AppStates, toastTypes } from '../../Constants/constants';
import { validateUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React from 'react';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';

const LoginPasswordComponent = () => {
    const { changeAppState, username } = useContext(Context);
    const [password, setPassword] = useState('');
    const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setIsLoginDisabled(true);
        try {
            const response: any = await validateUser({ username, password });
            if (response?.status === 200) {
                //change app state to profile
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
                    onKeyDown={(e) => { if (e.key === 'Enter') handleLogin() }}
                />
                <span className='forgotPasswordAction' onClick={() => changeAppState(AppStates.FORGOT_PASSWORD)}>Forgot password?</span>
                <Button label='Log in' lableClass='btnLabel loginLabel' className='btn2 loginBtn' disabled={isLoginDisabled} onClick={handleLogin} />
                <div className='signUpText signUp2'>
                    <span>Don't have an account?</span>
                    &nbsp;
                    <span className='signUpAction' onClick={() => { changeAppState(AppStates.SIGNUP) }}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default LoginPasswordComponent;