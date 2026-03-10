import type { Category as CategoryType } from 'oa-shared';
import type { ThemeUIStyleObject } from 'theme-ui';
export interface Props {
    category: CategoryType;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const Category: (props: Props) => import("react/jsx-runtime").JSX.Element;
