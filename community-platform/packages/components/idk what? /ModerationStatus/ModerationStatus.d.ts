import type { Moderation } from 'oa-shared';
import type { ThemeUIStyleObject } from 'theme-ui';
export declare const ModerationRecord: Record<Moderation, string>;
export interface Props {
    status: Moderation;
    sx?: ThemeUIStyleObject;
}
export declare const ModerationStatus: (props: Props) => import("react/jsx-runtime").JSX.Element;
