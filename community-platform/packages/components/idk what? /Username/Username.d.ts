import type { Author } from 'oa-shared';
import type { HTMLAttributeAnchorTarget } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
export interface IProps {
    user: Partial<Author>;
    sx?: ThemeUIStyleObject;
    isLink?: boolean;
    target?: HTMLAttributeAnchorTarget;
}
export declare const Username: ({ user, sx, target, isLink }: IProps) => import("react/jsx-runtime").JSX.Element;
