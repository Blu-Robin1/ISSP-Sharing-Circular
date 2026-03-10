import type { ThemeUIStyleObject } from 'theme-ui';
export interface ITag {
    label: string;
}
export interface Props {
    tag: ITag;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const Tag: ({ tag, sx }: Props) => import("react/jsx-runtime").JSX.Element | null;
