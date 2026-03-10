import * as React from 'react';
import type { ButtonProps as ThemeUiButtonProps } from 'theme-ui';
import type { IGlyphs } from '../Icon/types';
export interface IBtnProps extends React.ButtonHTMLAttributes<HTMLElement> {
    icon?: keyof IGlyphs;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    showIconOnly?: boolean;
    iconColor?: string;
    iconFilter?: string;
}
export type BtnProps = IBtnProps & ThemeUiButtonProps;
export declare const Button: (props: BtnProps) => import("react/jsx-runtime").JSX.Element;
