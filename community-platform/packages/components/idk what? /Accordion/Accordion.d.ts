import type { ThemeUIStyleObject } from 'theme-ui';
export interface IProps {
    children: React.ReactNode;
    sx?: ThemeUIStyleObject | undefined;
    title: string;
    subtitle?: string;
}
export declare const Accordion: (props: IProps) => import("react/jsx-runtime").JSX.Element;
