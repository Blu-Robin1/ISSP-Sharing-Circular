import './display-date.css';
type DateType = string | number | Date;
export interface IProps {
    createdAt: DateType;
    action?: string;
    showLabel?: boolean;
    modifiedAt?: DateType | null;
}
export declare const DisplayDate: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
