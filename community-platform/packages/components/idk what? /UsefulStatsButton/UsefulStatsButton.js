import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { Text, useThemeUI } from 'theme-ui';
import { Button } from '../Button/Button';
import { Tooltip } from '../Tooltip/Tooltip';
export const UsefulStatsButton = (props) => {
    const { theme } = useThemeUI();
    const navigate = useNavigate();
    const uuid = useId();
    const [disabled, setDisabled] = useState();
    const handleUsefulClick = async () => {
        setDisabled(true);
        try {
            await props.onUsefulClick();
        }
        catch (_) {
            // do nothing
        }
        setDisabled(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "button", "data-tooltip-id": uuid, "data-tooltip-content": props.isLoggedIn ? '' : 'Login to add your vote', "data-cy": props.isLoggedIn ? 'vote-useful' : 'vote-useful-redirect', onClick: () => props.isLoggedIn
                    ? handleUsefulClick()
                    : navigate('/sign-in?returnUrl=' + encodeURIComponent(location.pathname)), disabled: disabled, sx: {
                    fontSize: 2,
                    backgroundColor: theme.colors.white,
                    py: 0,
                    '&:hover': {
                        backgroundColor: theme.colors.softblue,
                    },
                    ...props.sx,
                }, icon: 'star-active', iconFilter: props.hasUserVotedUseful ? 'unset' : 'grayscale(1)', children: _jsx(Text, { py: 2, sx: {
                        display: 'inline-block',
                    }, children: props.hasUserVotedUseful ? 'Marked as useful' : 'Mark as useful' }) }), _jsx(Tooltip, { id: uuid })] }));
};
