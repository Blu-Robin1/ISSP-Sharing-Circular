import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Heading } from 'theme-ui';
import { fakeDisplayNotification } from '../utils';
import { NotificationItemSupabase } from './NotificationItemSupabase';
export default {
    title: 'Components/NotificationItemSupabase',
    component: NotificationItemSupabase,
};
const newsCommentNotification = fakeDisplayNotification();
const newsReplyNotification = fakeDisplayNotification({
    contentType: 'comments',
});
// const questionCommentNotification = fakeDisplayNotification()
// const questionReplyNotification = fakeDisplayNotification()
// const researchCommentNotification = fakeDisplayNotification()
// const researchReplyNotification = fakeDisplayNotification()
const markRead = () => console.log('markRead');
const modalDismiss = () => console.log('modalDismiss');
export const Default = () => (_jsxs(Flex, { sx: { gap: 2, maxWidth: '700px', flexDirection: 'column' }, children: [_jsx(Heading, { children: "News" }), _jsx(NotificationItemSupabase, { markRead: markRead, modalDismiss: modalDismiss, notification: newsCommentNotification }), _jsx(NotificationItemSupabase, { markRead: markRead, modalDismiss: modalDismiss, notification: newsReplyNotification })] }));
