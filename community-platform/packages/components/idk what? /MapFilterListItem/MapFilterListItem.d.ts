import type { ThemeUIStyleObject } from 'theme-ui';
interface IProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    filterType: string;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const MapFilterListItem: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
