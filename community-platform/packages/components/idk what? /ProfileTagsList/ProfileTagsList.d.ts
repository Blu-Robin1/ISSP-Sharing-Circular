import type { Profile, ProfileTag } from 'oa-shared';
import type { ThemeUIStyleObject } from 'theme-ui';
export interface IProps {
    tags: ProfileTag[] | null;
    visitorPolicy?: Profile['visitorPolicy'];
    isSpace: boolean;
    showVisitorModal?: () => void;
    sx?: ThemeUIStyleObject;
    large?: boolean;
}
export declare const ProfileTagsList: (props: IProps) => import("react/jsx-runtime").JSX.Element;
