import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, Flex, Image, Text } from 'theme-ui';
import ForumIcon from '../../assets/icons/icon-forum.svg';
import HowToCountIcon from '../../assets/icons/icon-library.svg';
import ResearchIcon from '../../assets/icons/icon-research.svg';
import starActiveSVG from '../../assets/icons/icon-star-active.svg';
import { ElWithBeforeIcon } from '../ElWithBeforeIcon/ElWithBeforeIcon';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Icon } from '../Icon/Icon';
import { InternalLink } from '../InternalLink/InternalLink';
export const UserStatistics = (props) => {
    if (isEmpty({ ...props })) {
        return null;
    }
    return (_jsx(Card, { sx: {
            backgroundColor: 'background',
            border: 0,
            padding: 1,
            ...props.sx,
        }, children: _jsx(Flex, { sx: {
                gap: 4,
                flexDirection: ['row', 'column', 'column'],
                alignItems: ['center', 'flex-start', 'flex-start'],
                justifyContent: ['center', 'flex-start', 'flex-start'],
            }, children: _jsxs(Flex, { sx: { gap: 4, flexDirection: 'column' }, children: [props.pin && (_jsx(InternalLink, { to: '/map#' + props.profile.username, sx: { color: 'black', ':hover': { textDecoration: 'underline' } }, "data-testid": "location-link", children: _jsxs(Flex, { sx: { alignItems: 'center', gap: 2 }, children: [_jsx(Icon, { glyph: "map", size: 22 }), _jsxs(Text, { children: ["Location: ", props.pin.country || 'View on Map'] })] }) })), props?.profile.badges?.map((badge) => (_jsxs(Flex, { sx: { alignItems: 'center', gap: 1 }, "data-testid": `badge_${badge.name}`, children: [_jsx(Image, { width: 20, height: 20, src: badge.imageUrl }), _jsx(Box, { children: badge.actionUrl ? (_jsx(ExternalLink, { href: badge.actionUrl, target: "_blank", children: _jsx(Text, { sx: { color: 'black' }, children: badge.displayName }) })) : (_jsx(Text, { sx: { color: 'black' }, children: badge.displayName })) })] }, badge.id))), props.usefulCount > 0 && (_jsxs(Flex, { "data-testid": "useful-stat", children: [_jsx(ElWithBeforeIcon, { icon: starActiveSVG }), `Useful: ${props.usefulCount}`] })), props.libraryCount > 0 && (_jsx(InternalLink, { to: '/library?q=' + props.profile.username, sx: { color: 'black', ':hover': { textDecoration: 'underline' } }, "data-testid": "library-link", children: _jsxs(Flex, { "data-testid": "library-stat", children: [_jsx(ElWithBeforeIcon, { icon: HowToCountIcon }), `Library: ${props.libraryCount}`] }) })), props.researchCount > 0 && (_jsx(InternalLink, { to: '/research?q=' + props.profile.username, sx: { color: 'black', ':hover': { textDecoration: 'underline' } }, "data-testid": "research-link", children: _jsxs(Flex, { "data-testid": "research-stat", children: [_jsx(ElWithBeforeIcon, { icon: ResearchIcon }), `Research: ${props.researchCount}`] }) })), props.questionCount > 0 && (_jsx(InternalLink, { to: '/questions', sx: { color: 'black', ':hover': { textDecoration: 'underline' } }, "data-testid": "questions-link", children: _jsxs(Flex, { "data-testid": "questions-stat", children: [_jsx(ElWithBeforeIcon, { icon: ForumIcon }), `Questions: ${props.questionCount}`] }) })), props.showViews && props.profile.totalViews > 0 && (_jsxs(Flex, { "data-testid": "profile-views-stat", children: [_jsx(Icon, { glyph: "show", size: 22 }), _jsx(Box, { ml: 1, children: `Views: ${props.profile.totalViews}` })] }))] }) }) }));
};
const isEmpty = (props) => !props.pin &&
    !props.profile.badges?.length &&
    !props.profile.country &&
    !props.libraryCount &&
    !props.researchCount &&
    !props.profile.totalViews &&
    !props.usefulCount;
