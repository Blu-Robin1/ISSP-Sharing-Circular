import type { NotificationDisplay } from 'oa-shared';
interface IProps {
    markRead: (id: number) => void;
    modalDismiss: () => void;
    notification: NotificationDisplay;
}
export declare const NotificationItemSupabase: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
