import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { useNavigate } from 'react-router';
import { Box } from 'theme-ui';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
export const FollowButton = (props) => {
    const { hasUserSubscribed, isLoggedIn, iconFollow = 'thunderbolt', iconUnfollow = 'thunderbolt-grey', labelFollow = 'Follow', labelUnfollow = 'Following', onFollowClick, showIconOnly = false, sx, tooltipFollow = '', tooltipUnfollow = '', variant = 'outline', } = props;
    const navigate = useNavigate();
    const uuid = useId();
    const tooltipContent = hasUserSubscribed ? tooltipUnfollow : tooltipFollow;
    if (showIconOnly) {
        return (_jsxs(_Fragment, { children: [_jsx(Box, { "data-testid": isLoggedIn ? 'follow-button' : 'follow-redirect', "data-cy": isLoggedIn ? 'follow-button' : 'follow-redirect', "data-tooltip-id": uuid, "data-tooltip-content": isLoggedIn ? tooltipContent : 'Login to follow', role: "img", "aria-label": hasUserSubscribed ? labelUnfollow : labelFollow, sx: sx, children: _jsx(Icon, { glyph: hasUserSubscribed ? iconFollow : iconUnfollow }) }), _jsx(Tooltip, { id: uuid })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "button", "data-testid": isLoggedIn ? 'follow-button' : 'follow-redirect', "data-cy": isLoggedIn ? 'follow-button' : 'follow-redirect', "data-tooltip-id": uuid, "data-tooltip-content": isLoggedIn ? tooltipContent : 'Login to follow', variant: variant, sx: { fontSize: 2, ...sx }, onClick: () => isLoggedIn
                    ? onFollowClick()
                    : navigate('/sign-in?returnUrl=' + encodeURIComponent(location.pathname)), icon: hasUserSubscribed ? iconFollow : iconUnfollow, showIconOnly: showIconOnly, small: !!props.small, children: hasUserSubscribed ? labelUnfollow : labelFollow }), _jsx(Tooltip, { id: uuid })] }));
};
