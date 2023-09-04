import React, { useState } from 'react';
import './styles.css';
import ProfileLeftPanel from '../ProfileLeftPanel';
import { profileMenu } from '../../Constants';
import PostPanel from '../PostPanel';

const UserProfileComponent = () => {
  document.title = 'Home/Twitter';
  const [activeProfileMenu, setprofileMenu] = useState<string>(profileMenu.HOME);
  return (
    <div className="userProfileDiv">
      <ProfileLeftPanel
        activeProfileMenu={activeProfileMenu}
        changeProfileMenu={setprofileMenu}
      />
      <PostPanel />
      <div
        style={{
          flex: '1 0 auto',
          minWidth: '250px',
        }}
      >
        SEARCH
      </div>
    </div>
  );
};

export default UserProfileComponent;
