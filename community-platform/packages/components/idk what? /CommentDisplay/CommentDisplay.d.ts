import type { Comment } from 'oa-shared';
import type { ReactNode } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
export interface IProps {
    comment: Comment;
    itemType: 'ReplyItem' | 'CommentItem';
    isEditable: boolean | undefined;
    setShowDeleteModal: (arg: boolean) => void;
    setShowEditModal: (arg: boolean) => void;
    handleCopyLink?: () => void;
    usefulButtonConfig: {
        hasUserVotedUseful: boolean;
        votedUsefulCount: number;
        isLoggedIn: boolean;
        onUsefulClick: (vote: 'add' | 'delete', eventCategory?: string) => Promise<void>;
        sx?: ThemeUIStyleObject;
    };
    followButton?: ReactNode;
    followButtonIcon?: ReactNode;
}
export declare const CommentDisplay: (props: IProps) => import("react/jsx-runtime").JSX.Element | undefined;
