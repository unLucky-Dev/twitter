export type UserDetialsType = {
    dateOfBirth?: string,
    name?: string,
    photo?: string,
    username?: string,
};

export type StoreValueType = {
    changeAppState?: (appState: string) => void,
    userDetails?: UserDetialsType,
    setUserDetails?: (userDetail: UserDetialsType) => void,
    setIsUserAuthorized?: (isAuthorized: boolean) => void,
    logOutHandler?: () => void,
    showLoader?: (loader: boolean) => void,
    loader?: boolean,
};

export type ProfileLeftPanelType = {
    activeProfileMenu: string, 
    changeProfileMenu: (menu: string) => void,
};