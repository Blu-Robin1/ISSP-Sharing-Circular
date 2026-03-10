/** @jsxImportSource theme-ui */
import type { SpaceProps, VerticalAlignProps } from 'styled-system';
import type { ThemeUIStyleObject } from 'theme-ui';
import type { IGlyphs } from './types';
export interface IProps extends React.ButtonHTMLAttributes<HTMLElement> {
    glyph: keyof IGlyphs;
    color?: string;
    filter?: string;
    size?: number | string;
    marginRight?: string;
    opacity?: string;
    onClick?: () => void;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const glyphs: IGlyphs;
export type IconProps = IProps & VerticalAlignProps & SpaceProps;
export declare const getGlyph: (glyph: string) => import("react").JSX.Element | null;
export declare const Icon: (props: IconProps) => import("react").JSX.Element | null;
