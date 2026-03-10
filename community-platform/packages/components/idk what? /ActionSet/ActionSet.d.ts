import type { ReactNode } from 'react';
interface IProps {
    children: ReactNode[];
    itemType: 'ReplyItem' | 'CommentItem';
}
export declare const ActionSet: ({ children, itemType }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
