import type { Comment } from 'oa-shared';
export interface Props {
    isShowReplies: boolean;
    replies: Comment[];
    setIsShowReplies: () => void;
}
export declare const ButtonShowReplies: (props: Props) => import("react/jsx-runtime").JSX.Element;
