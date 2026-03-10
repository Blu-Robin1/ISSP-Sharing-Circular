import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { countryToAlpha2 } from 'country-to-iso';
import { Flex, Text } from 'theme-ui';
import flagUnknownSVG from '../../assets/icons/flag-unknown.svg';
import { FlagIcon } from '../FlagIcon/FlagIcon';
import { InternalLink } from '../InternalLink/InternalLink';
import { UserBadge } from './UserBadge';
const getCountryCode = (country) => {
    if (!country) {
        return null;
    }
    return countryToAlpha2(country);
};
export const Username = ({ user, sx, target, isLink = true }) => {
    const { username, badges } = user;
    const countryCode = user.country ? getCountryCode(user.country) : null;
    const UserNameBody = (_jsxs(Flex, { "data-cy": "Username", sx: { fontFamily: 'body', gap: 1, alignItems: 'center' }, children: [countryCode ? (_jsx(Flex, { "data-testid": "Username: known flag", children: _jsx(FlagIcon, { countryCode: countryCode }) })) : (_jsx(Flex, { "data-testid": "Username: unknown flag", sx: {
                    backgroundImage: `url("${flagUnknownSVG}")`,
                    backgroundSize: 'cover',
                    borderRadius: '3px',
                    height: '14px',
                    width: '21px !important',
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: 0,
                    overflow: 'hidden',
                } })), _jsx(Text, { sx: {
                    color: 'black',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                }, title: username, children: username }), badges &&
                badges.map((badge) => {
                    return _jsx(UserBadge, { badge: badge }, badge.id);
                })] }));
    if (!isLink) {
        return UserNameBody;
    }
    return (_jsx(InternalLink, { to: `/u/${username}`, target: target || '_self', sx: {
            border: '1px solid transparent',
            display: 'inline-flex',
            paddingX: 1,
            paddingY: '3px',
            borderRadius: 1,
            marginLeft: -1,
            color: 'black',
            fontSize: 2,
            transition: '80ms ease-out all',
            '&:focus': {
                borderColor: '#20B7EB',
                background: 'softblue',
                outline: 'none',
                color: 'bluetag',
            },
            '&:hover': {
                borderColor: '#20B7EB',
                background: 'softblue',
                textcolor: 'bluetag',
            },
            ...(sx || {}),
        }, children: UserNameBody }));
};
