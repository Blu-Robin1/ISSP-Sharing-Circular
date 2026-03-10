import type { ProfileType } from 'oa-shared';
import type { ImageProps, ThemeUIStyleObject } from 'theme-ui';
export interface Props extends ImageProps {
    size?: number;
    profileType?: ProfileType;
    useLowDetailVersion?: boolean;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const MemberBadge: (props: Props) => import("react/jsx-runtime").JSX.Element | null;
