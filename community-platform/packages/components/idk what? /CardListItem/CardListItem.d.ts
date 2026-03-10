import type { MapPin } from 'oa-shared';
export interface IProps {
    item: MapPin;
    isSelectedPin: boolean;
    onPinClick: (arg: MapPin) => void;
    viewport: string;
}
export declare const CardListItem: (props: IProps) => import("react/jsx-runtime").JSX.Element;
