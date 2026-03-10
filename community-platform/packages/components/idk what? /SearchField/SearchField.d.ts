import type { ThemeUIStyleObject } from 'theme-ui';
export type Props = {
    autoComplete?: string;
    name?: string;
    id?: string;
    dataCy: string;
    placeHolder: string;
    value: string;
    onChange: (value: string) => void;
    onClickDelete: () => void;
    onClickSearch: () => void;
    additionalStyle?: ThemeUIStyleObject;
};
export declare const SearchField: (props: Props) => import("react/jsx-runtime").JSX.Element;
