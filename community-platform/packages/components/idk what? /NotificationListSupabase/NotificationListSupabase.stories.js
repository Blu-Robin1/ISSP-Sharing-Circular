import { jsx as _jsx } from "react/jsx-runtime";
import { fakeDisplayNotification } from '../utils';
import { NotificationListSupabase } from './NotificationListSupabase';
export default {
    title: 'Components/NotificationListSupabase',
    component: NotificationListSupabase,
};
const newsReplyNotification = fakeDisplayNotification({ isRead: false });
const questionCommentNotification = fakeDisplayNotification({ isRead: true });
export const Default = () => (_jsx(NotificationListSupabase, { isUpdatingNotifications: false, markAllRead: () => console.log('markAllRead'), markRead: () => console.log('markRead'), modalDismiss: () => console.log('modalDismiss'), notifications: [newsReplyNotification, questionCommentNotification] }));
export const NoNewNotifications = () => (_jsx(NotificationListSupabase, { isUpdatingNotifications: false, markAllRead: () => console.log('markAllRead'), markRead: () => console.log('markRead'), modalDismiss: () => console.log('modalDismiss'), notifications: [questionCommentNotification] }));
