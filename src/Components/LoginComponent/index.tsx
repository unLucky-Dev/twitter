import './styles.css';
import GoogleLogo from '../../Icons/GoogleLogo';
import AppleLogo from '../../Icons/AppleLogo';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { AppStates, toastTypes } from '../../Constants/constants';
import { checkUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React from 'react';

const LoginComponent = () => {
    document.title = 'Log in to Twitter/Twitter';
    const { changeAppState, username, setUsername } = useContext(Context);
    const [isValidating, setIsValidating] = useState(false);

    const handleNextClick = async () => {
        if (!username || isValidating) return;
        try {
            setIsValidating(true);
            const response: any = await checkUser({ username });
            if (response?.status === 200) {
                changeAppState(AppStates.LOGIN_PASSWORD);
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
        }
    }

    return (
        <div className='loginContentContainer'>
            <div className='loginContentDiv'>
                <h1>Sign in to Twitter</h1>
                <Button label='Sign in with Google' logo={<GoogleLogo />} />
                <Button label='Sign in with Apple' logo={<AppleLogo />} logoClass='btnLogo2' lableClass='btnLabel' />
                <div className='orDivider'>
                    <div className='line' />
                    <span>or</span>
                    <div className='line' />
                </div>
                <TextField
                    placeholder='Phone, email or username'
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNextClick() }}
                />
                <Button label='Next' lableClass='btnLabel' className='btn2' onClick={handleNextClick} />
                {/* change app state to forgot password */}
                <Button label='Forgot password?' lableClass='btnLabel' className='btn2 btn3' />
                <div className='signUpText'>
                    <span>Don't have an account?</span>
                    &nbsp;
                    <span className='signUpAction' onClick={() => { changeAppState(AppStates.SIGNUP) }}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
