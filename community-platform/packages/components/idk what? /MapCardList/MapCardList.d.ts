import type { MapPin } from 'oa-shared';
export interface IProps {
    list: MapPin[];
    onPinClick: (arg: MapPin) => void;
    selectedPin?: MapPin | null;
    viewport: string;
}
export declare const EMPTY_LIST = "No locations found. ";
export declare const MapCardList: (props: IProps) => import("react/jsx-runtime").JSX.Element;