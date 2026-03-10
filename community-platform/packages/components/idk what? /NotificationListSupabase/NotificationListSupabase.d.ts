import type { NotificationDisplay } from 'oa-shared';
export interface IProps {
    isUpdatingNotifications: boolean;
    markAllRead: () => void;
    markRead: (id: number) => void;
    modalDismiss: () => void;
    notifications: NotificationDisplay[];
}
export declare const NotificationListSupabase: (props: IProps) => import("react/jsx-runtime").JSX.Element;
