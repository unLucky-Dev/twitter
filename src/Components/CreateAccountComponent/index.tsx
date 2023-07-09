import './styles.css';
import Button from '../Button';
import { useContext, useState } from 'react';
import Context from '../../store/context';
import { AppStates, toastTypes } from '../../Constants/constants';
import TextField from '../TextField';
import React from 'react';
import { userLogo } from '../../Icons/DefaultUserLogo';
import { addUser } from '../../api/twitterService';
import showMessageToast from '../ToastMessage/toastMessage';

const CreateAccountComponent = () => {
    document.title = 'Sign up for Twitter/Twitter';
    const { changeAppState } = useContext(Context);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [dob, setDob] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);

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
        showMessageToast(toastTypes.INFO, 'Creating Account...', 200);
        const payload = { name, username: phone, dob, password, profileImage };
        try {
            const response: any = await addUser(payload);
            if (response?.status === 201) {
                showMessageToast(toastTypes.SUCCESS, 'Account created successfully. Login to Continue.', 500);
                changeAppState(AppStates.LOGIN);
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
    }

    const handleImgUpload = (e) => {
        e.stopPropagation();
        document.getElementById('imgUploadBtn')?.click();
    }

    const handleImageSelected = (e) => {
        const fileList = e.target.files;
        if (fileList.length) {
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
        if (confPassword && enteredPassword !== confPassword)
            document.getElementById('confirmPassInput')?.classList.add('error');
        else
            document.getElementById('confirmPassInput')?.classList.remove('error');
        setPassword(enteredPassword);
    }

    const isSignUpDisabled = isBtnDisabled || !(name && password && phone && dob);

    return (
        <div className='loginContentContainer'>
            <div className='loginContentDiv createAccountContainer'>
                <div className='headerWithImage'>
                    <h1>Create your account</h1>
                    <div className='imageDiv' onClick={handleImgUpload}>
                        <input id='imgUploadBtn' type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageSelected} hidden />
                        <img src={profileImage ?? userLogo} height='72px' width='72px' alt='click to change.' />
                    </div>
                </div>
                <TextField placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                <TextField placeholder='Phone' type='number' onChange={handlePhoneChange} />
                <TextField placeholder='Date of birth' type='text' onFocus={(e) => { e.target.type = 'date' }}
                    onBlur={(e) => { if (e.target.value === '') e.target.type = 'text' }} onChange={handleDOBChange} />
                <TextField placeholder='Passsword' type='password' onChange={handlePasswordChange} />
                <TextField id='confirmPassInput' placeholder='Confirm password' type='password' onChange={handleConfirmPassword} />
                <Button label='Sign Up' lableClass='btnLabel' disabled={isSignUpDisabled} onClick={handleSignUp} />
                <div className='loginText'>
                    <span>Have an account already?</span>
                    &nbsp;
                    <span className='loginAction' onClick={() => { changeAppState(AppStates.LOGIN) }}>Log in</span>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountComponent;
