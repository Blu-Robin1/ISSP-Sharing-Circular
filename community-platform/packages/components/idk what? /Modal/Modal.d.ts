import type { ThemeUIStyleObject } from 'theme-ui';
export interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    children: React.ReactNode;
    width?: number;
    height?: number;
    sx?: ThemeUIStyleObject;
}
export declare const Modal: (props: Props) => import("react/jsx-runtime").JSX.Element | null;
