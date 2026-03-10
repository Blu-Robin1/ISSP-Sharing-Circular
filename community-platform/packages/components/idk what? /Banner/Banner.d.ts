import type { ThemeUIStyleObject } from 'theme-ui';
type AlertVariants = 'accent' | 'failure' | 'info' | 'success';
export interface IProps {
    children: React.ReactNode;
    onClick?: () => void;
    sx?: ThemeUIStyleObject | undefined;
    variant?: AlertVariants;
}
export declare const Banner: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
