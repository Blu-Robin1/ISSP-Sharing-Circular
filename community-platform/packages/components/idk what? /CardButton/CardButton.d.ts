import type { BoxProps, ThemeUIStyleObject } from 'theme-ui';
export interface IProps extends BoxProps {
    children: React.ReactNode;
    extrastyles?: ThemeUIStyleObject | undefined;
    isSelected?: boolean;
}
export declare const CardButton: (props: IProps) => import("react/jsx-runtime").JSX.Element;
