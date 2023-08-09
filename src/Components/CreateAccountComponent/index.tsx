import './styles.css';
import Button from '../Button';
import { LoginAppStates, toastTypes } from '../../Constants';
import TextField from '../TextField';
import React, { ChangeEvent, useState } from 'react';
import { userLogo } from '../../Icons/DefaultUserLogo';
import { addUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';
import CloseIcon from '../../Icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const CreateAccountComponent = () => {
    document.title = 'Sign up for Twitter/Twitter';
    const loader = useSelector((state: any) => state.commonStore.loader);
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setconfPassword] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleConfirmPassword = (e: React.KeyboardEvent<HTMLElement>) => {
        const element = e.target as HTMLInputElement;
        const confirmPassword = element.value;
        const isMatched = confirmPassword === password;
        if (!isMatched)
            element.classList.add('error');
        else
            element.classList.remove('error');
        setconfPassword(confirmPassword);
        setIsBtnDisabled(!isMatched);
    }

    const handlePhoneChange = (e: React.KeyboardEvent<HTMLElement>) => {
        const element = e.target as HTMLInputElement;
        const phoneNumber = element.value;
        if (phoneNumber.length > 0 && phoneNumber.length !== 10) {
            element.classList.add('error');
            setPhone('');
        }
        else {
            element.classList.remove('error');
            setPhone(phoneNumber);
        }
    }

    const handleSignUp = async () => {
        dispatch(ACTIONS.updateLoaderState(true));
        showMessageToast(toastTypes.INFO, 'Creating Account...', 200);
        const payload = { name, username: phone, dob, password, profileImage };
        try {
            const response: any = await addUser(payload);
            if (response?.status === 201) {
                showMessageToast(toastTypes.SUCCESS, 'Account created successfully. Login to Continue.', 500);
                dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN));
            }
            else if (response?.status === 413) {
                showMessageToast(toastTypes.ERROR, 'Image size is too large.');
            }
            else
                showMessageToast(toastTypes.ERROR, response.error ?? 'Something went wrong. Please try again.');
        }
        catch (e) {
            showMessageToast(toastTypes.ERROR, 'Something went wrong. Please try again.');
            console.log('error in handleSignUp', e);
        }
        finally {
            dispatch(ACTIONS.updateLoaderState(false));
        }
    }

    const handleImgUpload = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        document.getElementById('imgUploadBtn')?.click();
    }

    const handleImageSelected = (e: ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        const fileList = element.files ?? [];
        if (fileList.length) {
            const file = fileList[0];
            if (file.size / 1024 > 1024) {
                showMessageToast(toastTypes.WARN, 'Image size should be less than 1mb.');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload = () => {
                setProfileImage(reader.result?.toString() ?? userLogo);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    const handleDOBChange = (e: React.KeyboardEvent<HTMLElement>) => {
        const element = e.target as HTMLInputElement;
        const date = element.value;
        const isBeforeToday = (new Date(new Date().toDateString()).getTime() - new Date(date).getTime()) > 0;
        if (!date || isBeforeToday) {
            element.classList.remove('error');
            setDob(date);
        }
        else {
            element.classList.add('error');
            setDob('');
        }
    }

    const handlePasswordChange = (e: React.KeyboardEvent<HTMLElement>) => {
        const element = e.target as HTMLInputElement;
        const enteredPassword = element.value;
        const isNotMatched = confPassword && enteredPassword !== confPassword;
        if (isNotMatched)
            document.getElementById('confirmPassInput')?.classList.add('error');
        else
            document.getElementById('confirmPassInput')?.classList.remove('error');

        if (enteredPassword && enteredPassword.length >= 8)
            element?.classList.remove('error');
        else if (enteredPassword && enteredPassword.length < 8)
            element?.classList.add('error');

        setPassword(enteredPassword);
        setIsBtnDisabled(Boolean(isNotMatched));
    }

    const inputFieldIcon = (value, changeState) => {
        if (value)
            return <HidePassword className='textFieldIcon' cursor='pointer' onClick={() => changeState(false)} />
        if (!value)
            return <ShowPassword className='textFieldIcon' cursor='pointer' onClick={() => changeState(true)} />
    }

    const isSignUpDisabled = isBtnDisabled || !(name && password && phone && dob && password.length >= 8);

    return (
        <div className='loginContentContainer'>
            <div className='loginContentDiv createAccountContainer'>
                <div className='headerWithImage'>
                    <h1>Create your account</h1>
                    <div className='imageDiv'>
                        <input id='imgUploadBtn' type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageSelected} hidden />
                        <img className='profileImg' src={profileImage ?? userLogo} height='75px' alt='click to change.' onClick={handleImgUpload} />
                        {profileImage && <CloseIcon className='removeProfilePic' fill='white' cursor='pointer' onClick={() => setProfileImage(null)} />}
                    </div>
                </div>
                <TextField placeholder='Name' onChange={(e: React.KeyboardEvent<HTMLElement>) => { setName((e.target as HTMLInputElement).value) }} disabled={loader} />
                <TextField placeholder='Phone' type='number' onChange={handlePhoneChange} disabled={loader} />
                <TextField
                    placeholder='Date of birth'
                    type='text'
                    onFocus={(e: React.MouseEvent<HTMLElement>) => { (e.target as HTMLInputElement).type = 'date' }}
                    onBlur={(e: React.MouseEvent<HTMLElement>) => { if ((e.target as HTMLInputElement).value === '') (e.target as HTMLInputElement).type = 'text' }}
                    onChange={handleDOBChange}
                    disabled={loader}
                />
                <TextField
                    placeholder='Passsword (Must contain atleast 8 characters)'
                    type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange}
                    icon={() => inputFieldIcon(showPassword, setShowPassword)}
                    disabled={loader}
                />
                <TextField
                    id='confirmPassInput'
                    placeholder='Confirm password'
                    type={showConfirmPassword ? 'text' : 'password'} onChange={handleConfirmPassword}
                    icon={() => inputFieldIcon(showConfirmPassword, setShowConfirmPassword)}
                    disabled={loader}
                />
                <Button label='Sign Up' lableClass='btnLabel' disabled={isSignUpDisabled || loader} onClick={handleSignUp} />
                <div className='loginText'>
                    <span>Have an account already?</span>
                    &nbsp;
                    <span className='loginAction' onClick={() => dispatch(ACTIONS.updateAppState(LoginAppStates.LOGIN))}>Log in</span>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountComponent;
