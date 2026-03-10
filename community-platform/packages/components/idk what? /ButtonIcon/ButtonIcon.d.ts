import type { ThemeUIStyleObject } from 'theme-ui';
import type { IGlyphs } from '../Icon/types';
export interface IProps extends React.ButtonHTMLAttributes<HTMLElement> {
    icon: keyof IGlyphs;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const ButtonIcon: (props: IProps) => import("react/jsx-runtime").JSX.Element;
