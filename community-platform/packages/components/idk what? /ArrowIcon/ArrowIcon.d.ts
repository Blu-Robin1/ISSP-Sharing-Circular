import type { ThemeUIStyleObject } from 'theme-ui';
import './styles.css';
interface IProps {
    disabled?: boolean;
    direction: 'left' | 'right';
    sx?: ThemeUIStyleObject;
    onClick?: () => void;
}
export declare const Arrow: ({ disabled, direction, onClick, sx }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
