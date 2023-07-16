import './styles.css';
import Button from '../Button';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { LoginAppStates, toastTypes } from '../../Constants/constants';
import TextField from '../TextField';
import React from 'react';
import { userLogo } from '../../Icons/DefaultUserLogo';
import { addUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';
import ShowPassword from '../../Icons/showPassword';
import HidePassword from '../../Icons/HidePassword';
import CloseIcon from '../../Icons/CloseIcon';

const CreateAccountComponent = () => {
    document.title = 'Sign up for Twitter/Twitter';
    const { changeAppState, showLoader } = useContext(Context);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [dob, setDob] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        const isMatched = confirmPassword === password;
        if (!isMatched)
            e.target.classList.add('error');
        else
            e.target.classList.remove('error');
        setconfPassword(confirmPassword);
        setIsBtnDisabled(!isMatched);
    }

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        if (phoneNumber.length > 0 && phoneNumber.length !== 10) {
            e.target.classList.add('error');
            setPhone('');
        }
        else {
            e.target.classList.remove('error');
            setPhone(phoneNumber);
        }
    }

    const handleSignUp = async () => {
        showLoader(true);
        showMessageToast(toastTypes.INFO, 'Creating Account...', 200);
        const payload = { name, username: phone, dob, password, profileImage };
        try {
            const response: any = await addUser(payload);
            if (response?.status === 201) {
                showMessageToast(toastTypes.SUCCESS, 'Account created successfully. Login to Continue.', 500);
                changeAppState(LoginAppStates.LOGIN);
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
            showLoader(false);
        }
    }

    const handleImgUpload = (e) => {
        e.stopPropagation();
        document.getElementById('imgUploadBtn')?.click();
    }

    const handleImageSelected = (e) => {
        const fileList = e.target.files;
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

    const handleDOBChange = (e) => {
        const date = e.target.value;
        const isBeforeToday = (new Date(new Date().toDateString()).getTime() - new Date(date).getTime()) > 0;
        if (!date || isBeforeToday) {
            e.target.classList.remove('error');
            setDob(date);
        }
        else {
            e.target.classList.add('error');
            setDob('');
        }
    }

    const handlePasswordChange = (e) => {
        const enteredPassword = e.target.value;
        const isNotMatched = confPassword && enteredPassword !== confPassword;
        if (isNotMatched)
            document.getElementById('confirmPassInput')?.classList.add('error');
        else
            document.getElementById('confirmPassInput')?.classList.remove('error');

        if (enteredPassword && enteredPassword.length >= 8)
            e.target?.classList.remove('error');
        else if (enteredPassword && enteredPassword.length < 8)
            e.target?.classList.add('error');

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
                <TextField placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                <TextField placeholder='Phone' type='number' onChange={handlePhoneChange} />
                <TextField placeholder='Date of birth' type='text' onFocus={(e) => { e.target.type = 'date' }}
                    onBlur={(e) => { if (e.target.value === '') e.target.type = 'text' }} onChange={handleDOBChange} />
                <TextField
                    placeholder='Passsword (Must contain atleast 8 characters)'
                    type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange}
                    icon={() => inputFieldIcon(showPassword, setShowPassword)}
                />
                <TextField
                    id='confirmPassInput'
                    placeholder='Confirm password'
                    type={showConfirmPassword ? 'text' : 'password'} onChange={handleConfirmPassword}
                    icon={() => inputFieldIcon(showConfirmPassword, setShowConfirmPassword)}
                />
                <Button label='Sign Up' lableClass='btnLabel' disabled={isSignUpDisabled} onClick={handleSignUp} />
                <div className='loginText'>
                    <span>Have an account already?</span>
                    &nbsp;
                    <span className='loginAction' onClick={() => { changeAppState(LoginAppStates.LOGIN) }}>Log in</span>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountComponent;
