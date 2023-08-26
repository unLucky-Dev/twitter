import React from 'react';
import './styles.css';
import TwitterLogo from '../../Icons/TwitterLogo';
import DefaultHomeLogo from '../../Icons/DefaultHomeLogo';
import DefaultSearchLogo from '../../Icons/DefaultSearchLogo';
import DefaultNotificationLogo from '../../Icons/DefaultNotificationLogo';
import DefaultProfileLogo from '../../Icons/DefaultProfileLogo';
import Button from '../Button';
import { userLogo } from '../../Icons/DefaultUserLogo';
import ActiveHomeLogo from '../../Icons/ActiveHomeLogo';
import ActiveSearchLogo from '../../Icons/ActiveSearchLogo';
import ActiveNotificationLogo from '../../Icons/ActiveNotificationLogo';
import ActiveProfileLogo from '../../Icons/ActiveProfileLogo';
import { profileMenu } from '../../Constants';
import { ProfileLeftPanelType } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../store/actions';

const menuLogoMap = {
  HOME: {
    active: <ActiveHomeLogo className="menuItemLogo" />,
    default: <DefaultHomeLogo className="menuItemLogo" />,
  },
  SEARCH: {
    active: <ActiveSearchLogo className="menuItemLogo" />,
    default: <DefaultSearchLogo className="menuItemLogo" />,
  },
  NOTIFICATION: {
    active: <ActiveNotificationLogo className="menuItemLogo" />,
    default: <DefaultNotificationLogo className="menuItemLogo" />,
  },
  PROFILE: {
    active: <ActiveProfileLogo className="menuItemLogo" />,
    default: <DefaultProfileLogo className="menuItemLogo" />,
  },
};

const ProfileLeftPanel = ({
  activeProfileMenu,
  changeProfileMenu,
}: ProfileLeftPanelType) => {
  const [isLogOutDivVisible, setIsLogOutDivVisible] = React.useState(false);
  const userDetails = useSelector((state: any) => state.commonStore.userDetails);
  const dispatch = useDispatch();

  const handleUserDetailClick = () => {
    const userDetailsElement = Array.from(
      document.getElementsByClassName(
        'userDetailDiv',
      ) as HTMLCollectionOf<HTMLElement>,
    )[0];
    if (userDetailsElement)
      userDetailsElement.style.marginTop = isLogOutDivVisible ? 'auto' : '0';
    setIsLogOutDivVisible(!isLogOutDivVisible);
  };

  return (
    <div className="leftPanelDiv">
      <TwitterLogo className="twitterLogo" />
      <div>
        {Object.keys(profileMenu).map((menu) => {
          const isActiveMenu = activeProfileMenu === profileMenu[menu];
          return (
            <div
              key={menu}
              className={`menuItem ${isActiveMenu ? 'active' : ''}`}
              onClick={() => changeProfileMenu(profileMenu[menu])}
            >
              {isActiveMenu ? menuLogoMap[menu].active : menuLogoMap[menu].default}
              {profileMenu[menu]}
            </div>
          );
        })}
        <Button label="Tweet" className="tweetBtn" lableClass="tweetLabel" />
      </div>
      {isLogOutDivVisible && (
        <div id="logOutDiv" className="logoutDiv">
          <div
            className="logOutBtn"
            onClick={() => dispatch(ACTIONS.logoutHandler())}
          >
            Log out @{userDetails?.username}
          </div>
        </div>
      )}
      <div className="userDetailDiv" onClick={handleUserDetailClick}>
        <div className="imageDiv">
          <img
            className="profileImg"
            src={userDetails?.photo ?? userLogo}
            height="50px"
            alt="Profile"
          />
        </div>
        <div className="userProfileDetailDiv">
          <div className="userName">{userDetails?.name?.toUpperCase()}</div>
          <div className="userUserName">@{userDetails?.username}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftPanel;
