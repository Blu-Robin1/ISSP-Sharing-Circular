import { jsx as _jsx } from "react/jsx-runtime";
import { FollowButton } from './FollowButton';
export default {
    title: 'Components/FollowButton',
    component: FollowButton,
};
export const LoggedOut = () => (_jsx(FollowButton, { isLoggedIn: false, hasUserSubscribed: false, onFollowClick: () => null }));
export const LoggedIn = () => (_jsx(FollowButton, { hasUserSubscribed: false, isLoggedIn: true, onFollowClick: () => null }));
export const CurrentUserSubscribed = () => (_jsx(FollowButton, { hasUserSubscribed: true, isLoggedIn: true, onFollowClick: () => null }));
