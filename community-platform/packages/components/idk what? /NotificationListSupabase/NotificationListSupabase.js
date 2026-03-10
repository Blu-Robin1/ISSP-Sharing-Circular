import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Flex, Heading } from 'theme-ui';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { InternalLink } from '../InternalLink/InternalLink';
import { Loader } from '../Loader/Loader';
import { NotificationItemSupabase } from '../NotificationItemSupabase/NotificationItemSupabase';
export const NotificationListSupabase = (props) => {
    const [isUnreadOnly, setIsUnreadOnly] = useState(true);
    const { isUpdatingNotifications, markAllRead, markRead, modalDismiss, notifications } = props;
    const anyUnread = notifications.filter(({ isRead }) => !isRead).length > 0;
    const notificationList = notifications
        .filter(({ isRead }) => (isUnreadOnly ? !isRead : !isRead || isRead))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
    return (_jsxs(Flex, { "data-cy": "NotificationListSupabase", sx: { flexDirection: 'column', gap: 4 }, children: [_jsxs(Flex, { sx: { alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx(Heading, { sx: { fontSize: 6 }, children: "Notifications" }), _jsx(ButtonIcon, { "data-cy": "NotificationListSupabase-CloseButton", icon: "close", onClick: modalDismiss, sx: { border: 'none', paddingLeft: 2, paddingRight: 3 } })] }), _jsxs(Flex, { sx: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2,
                }, children: [_jsxs(Flex, { sx: { alignItems: 'center', gap: 2 }, children: [_jsxs(Flex, { sx: {
                                    border: '2px solid',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    backgroundColor: 'black',
                                    gap: '2px',
                                }, children: [_jsx(Button, { onClick: () => setIsUnreadOnly(true), variant: "subtle", sx: {
                                            backgroundColor: isUnreadOnly ? 'activeYellow' : 'white',
                                            borderRadius: 0,
                                            ':hover': {
                                                backgroundColor: isUnreadOnly ? 'activeYellow' : 'white',
                                                textDecoration: isUnreadOnly ? 'none' : 'underline',
                                            },
                                        }, children: "Unread" }), _jsx(Button, { "data-testid": "NotificationListSupabase-ShowAll", onClick: () => setIsUnreadOnly(false), variant: "subtle", sx: {
                                            backgroundColor: !isUnreadOnly ? 'activeYellow' : 'white',
                                            borderRadius: 0,
                                            ':hover': {
                                                backgroundColor: !isUnreadOnly ? 'activeYellow' : 'white',
                                                textDecoration: !isUnreadOnly ? 'none' : 'underline',
                                            },
                                        }, children: "All" })] }), anyUnread && (_jsx(Button, { "data-testid": "NotificationListSupabase-MarkAllRead", "data-cy": "NotificationListSupabase-MarkAllRead", onClick: markAllRead, disabled: isUpdatingNotifications, icon: "doubleTick", variant: "outline", children: "Mark all read" }))] }), _jsx(InternalLink, { to: "/settings/notifications", children: _jsx(Button, { icon: "account", variant: "outline", sx: { alignSelf: 'flex-end' }, onClick: modalDismiss, showIconOnly: true, children: "Update preferences" }) })] }), isUpdatingNotifications && _jsx(Loader, {}), !isUpdatingNotifications &&
                notificationList.map((notification, index) => {
                    return (_jsx(NotificationItemSupabase, { markRead: markRead, modalDismiss: modalDismiss, notification: notification }, index));
                }), notificationList.length === 0 && !isUpdatingNotifications && (_jsx(Box, { sx: {
                    backgroundColor: 'background',
                    borderRadius: 2,
                    padding: 4,
                    textAlign: 'center',
                }, children: "Wow... No unread notifications!" }))] }));
};
