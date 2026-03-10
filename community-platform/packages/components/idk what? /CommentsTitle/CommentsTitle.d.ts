import type { Comment } from 'oa-shared';
export declare const NO_COMMENTS = "Start the discussion";
export declare const ONE_COMMENT = "1 Comment";
export declare const COMMENTS = "Comments";
export interface IProps {
    comments: Comment[];
}
export declare const CommentsTitle: ({ comments }: IProps) => import("react/jsx-runtime").JSX.Element;
