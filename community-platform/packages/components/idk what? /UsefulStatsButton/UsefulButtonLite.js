import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { Flex, Text, useThemeUI } from 'theme-ui';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
export const UsefulButtonLite = (props) => {
    const { hasUserVotedUseful, votedUsefulCount, isLoggedIn, sx, onUsefulClick } = props.usefulButtonLiteConfig;
    const { theme } = useThemeUI();
    const navigate = useNavigate();
    const uuid = useId();
    const [disabled, setDisabled] = useState();
    const usefulAction = hasUserVotedUseful ? 'delete' : 'add';
    const handleUsefulClick = async () => {
        setDisabled(true);
        try {
            await onUsefulClick(usefulAction, 'Comment');
        }
        catch (_) {
            // handle error or ignore
        }
        setDisabled(false);
    };
    const backgroundColor = !votedUsefulCount || votedUsefulCount === 0 ? 'transparent' : theme.colors.background;
    return (_jsxs(Flex, { sx: { alignSelf: 'flex-end', position: 'relative', alignItems: 'center' }, children: [votedUsefulCount > 0 && (_jsx(Flex, { sx: {
                    position: 'absolute',
                    left: -6,
                    backgroundColor,
                    lineHeight: '1rem',
                    minWidth: '2.75rem',
                    width: 'fit-content',
                    height: '1.5rem',
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '4px 4px 4px 8px',
                    fontSize: '14px',
                    zIndex: 1,
                }, children: _jsx(Text, { children: votedUsefulCount ?? 0 }) })), _jsx(Button, { type: "button", "data-tooltip-id": uuid, "data-tooltip-content": isLoggedIn ? '' : 'Login to add your vote', "data-cy": isLoggedIn ? 'vote-useful' : 'vote-useful-redirect', title: "Mark as useful", onClick: () => isLoggedIn
                    ? handleUsefulClick()
                    : navigate('/sign-in?returnUrl=' + encodeURIComponent(location.pathname)), disabled: disabled, variant: "outline", sx: {
                    position: 'relative',
                    fontSize: 1,
                    border: 'none',
                    padding: 1,
                    paddingRight: 8,
                    paddingLeft: 8,
                    display: 'flex',
                    alignItems: 'center',
                    width: '2rem',
                    height: '2rem',
                    gap: 1,
                    zIndex: 2,
                    ...sx,
                }, children: _jsx(Flex, { sx: { alignItems: 'center' }, children: _jsx(Icon, { glyph: "star-active", size: 24, filter: hasUserVotedUseful ? 'unset' : 'grayscale(1)' }) }) })] }));
};
