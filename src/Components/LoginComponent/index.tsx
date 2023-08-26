import './styles.css';
import GoogleLogo from '../../Icons/GoogleLogo';
import AppleLogo from '../../Icons/AppleLogo';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import { LoginAppStates, toastTypes } from '../../Constants';
import { checkUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const LoginComponent = () => {
    document.title = 'Log in to Twitter/Twitter';
    const userDetails = useSelector((state: any) => state.commonStore.userDetails);
    const loader = useSelector((state: any) => state.commonStore.loader);
    const dispatch = useDispatch();

    const [isValidating, setIsValidating] = useState<boolean>(false);
    const username = userDetails?.username;

    const handleNextClick = async () => {
        if (!username || isValidating || loader) return;
        dispatch(ACTIONS.updateLoaderState(true));
        try {
            setIsValidating(true);
            const response: any = await checkUser({ username });
            if (response?.status === 200) {
                dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN_PASSWORD));
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
            dispatch(ACTIONS.updateLoaderState(false));
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
                    onChange={(e) => dispatch(ACTIONS.updateUserDetails({ ...userDetails, username: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNextClick() }}
                    disabled={loader}
                />
                <Button label='Next' lableClass='btnLabel' className='btn2' onClick={handleNextClick} disabled={loader} />
                <Button label='Forgot password?' lableClass='btnLabel' className='btn2 btn3' onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.FORGOT_PASSWORD))} />
                <div className='signUpText'>
                    <span>Don't have an account?</span>
                    &nbsp;
                    <span className='signUpAction' onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.SIGNUP))}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
