import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex } from 'theme-ui';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { CardButton } from '../CardButton/CardButton';
import { CardProfile } from '../CardProfile/CardProfile';
import { InternalLink } from '../InternalLink/InternalLink';
export const PinProfile = ({ item, onClose }) => {
    const isContactable = item.profile?.isContactable !== false;
    return (_jsxs(CardButton, { sx: { '&:hover': 'none' }, "data-cy": "PinProfile", children: [_jsx(Box, { sx: { position: 'absolute', right: 0 }, children: _jsx(Box, { sx: { float: 'right', marginTop: 1, marginRight: '8px' }, children: _jsx(ButtonIcon, { "data-cy": "PinProfileCloseButton", icon: "close", onClick: () => onClose(), sx: { borderWidth: 0, height: 'auto' } }) }) }), _jsxs(Box, { sx: { width: '100%', height: '100%', zIndex: 2 }, children: [_jsx(CardProfile, { item: item, isLink: true }), isContactable && (_jsx(Flex, { sx: { justifyContent: 'flex-end' }, children: _jsx(InternalLink, { to: `/u/${item.profile?.username}#contact`, "data-cy": "PinProfileMessageLink", target: "_blank", children: _jsx(Button, { icon: "contact", sx: { margin: 1 }, small: true, children: "Send Message" }) }) }))] })] }));
};
