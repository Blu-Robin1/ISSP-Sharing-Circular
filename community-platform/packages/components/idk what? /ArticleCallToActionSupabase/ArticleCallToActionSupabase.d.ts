import type { Author } from 'oa-shared';
export interface IProps {
    author: Author;
    children: React.ReactNode;
    contributors?: Author[];
}
export declare const ArticleCallToActionSupabase: (props: IProps) => import("react/jsx-runtime").JSX.Element;
