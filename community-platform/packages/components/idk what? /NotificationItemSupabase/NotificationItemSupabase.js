import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { DisplayDate } from '../DisplayDate/DisplayDate';
import { Icon } from '../Icon/Icon';
import { InternalLink } from '../InternalLink/InternalLink';
const commentStyling = {
    '::before': {
        content: 'open-quote',
        position: 'absolute',
        fontSize: '4em',
        color: 'white',
        textShadow: '2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000',
        transform: 'translateX(-8px) rotate(-10deg) translateY(-12px)',
    },
    '::after': {
        content: 'close-quote',
        position: 'relative',
        bottom: 0,
        height: 0,
        width: '10px',
        fontSize: '4em',
        color: 'white',
        textShadow: '2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000',
        transform: 'translateX(-8px) rotate(10deg) translateY(14px)',
    },
};
export const NotificationItemSupabase = (props) => {
    const { markRead, modalDismiss, notification } = props;
    const borderStyle = {
        background: notification.isRead ? 'background' : '#fff0b4',
        borderColor: notification.isRead ? 'background' : 'activeYellow',
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 2,
        gap: 2,
    };
    const onClick = () => {
        markRead(notification.id);
        modalDismiss();
    };
    const isDiscussion = notification.contentType === 'comments';
    return (_jsx(Flex, { "data-cy": "NotificationListItemSupabase", "data-testid": "NotificationListItemSupabase", children: _jsx(InternalLink, { onClick: onClick, to: notification.link, sx: { color: 'black', width: '100%' }, children: _jsxs(Flex, { sx: borderStyle, children: [notification.sidebar.image && _jsx(_Fragment, { children: "hi" }), notification.sidebar.icon && (_jsx(Flex, { children: _jsx(Icon, { glyph: notification.sidebar.icon, size: 30 }) })), _jsxs(Flex, { sx: { flex: 1, flexDirection: 'column', gap: 2 }, children: [_jsxs(Flex, { sx: { justifyContent: 'space-between', gap: 2 }, children: [_jsxs(Text, { sx: { flex: 1 }, children: [notification.triggeredBy, " ", notification.title] }), _jsx(Text, { sx: { fontSize: 1, color: 'grey', textAlign: 'right' }, children: _jsx(DisplayDate, { createdAt: notification.date, showLabel: false }) })] }), _jsx(Flex, { sx: { ...(isDiscussion ? commentStyling : {}) }, children: _jsx(Text, { sx: {
                                        background: 'softblue',
                                        border: '2px solid black',
                                        borderRadius: 5,
                                        padding: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }, children: notification.body }) })] })] }) }) }));
};
