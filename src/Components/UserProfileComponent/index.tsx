import React, { useState } from 'react'
import './styles.css';
import ProfileLeftPanel from '../ProfileLeftPanel';
import { profileMenu } from '../../Constants';

const UserProfileComponent = () => {
    document.title = 'Home/Twitter';
    const [activeProfileMenu, setprofileMenu] = useState<string>(profileMenu.HOME);
    return (
        <div className='userProfileDiv'>
            <ProfileLeftPanel activeProfileMenu={activeProfileMenu} changeProfileMenu={setprofileMenu} />
            <div style={{
                borderLeft: '1px solid rgb(47, 51, 54)',
                borderRight: '1px solid rgb(47, 51, 54)',
                flex: '2 0 auto',
                minWidth: '650px'
            }}>POST</div>
            <div style={{
                flex: '1 0 auto',
                minWidth: '250px'
            }}>SEARCH</div>
        </div>
    )
};

export default UserProfileComponent;