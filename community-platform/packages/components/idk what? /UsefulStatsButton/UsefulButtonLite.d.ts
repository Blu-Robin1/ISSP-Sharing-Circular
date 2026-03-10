import type { ThemeUIStyleObject } from 'theme-ui';
export interface IProps {
    usefulButtonLiteConfig: {
        hasUserVotedUseful: boolean;
        votedUsefulCount: number;
        isLoggedIn: boolean;
        onUsefulClick: (vote: 'add' | 'delete', eventCategory?: string) => Promise<void>;
        sx?: ThemeUIStyleObject;
    };
}
export declare const UsefulButtonLite: (props: IProps) => import("react/jsx-runtime").JSX.Element;
