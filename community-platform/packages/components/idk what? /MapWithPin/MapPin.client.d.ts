import type { DivIcon } from 'leaflet';
export interface IProps {
    position: {
        lat: number;
        lng: number;
    };
    onDrag(lng: number): void;
    markerIcon?: DivIcon;
    onClick?: () => void;
}
export declare const MapPin: (props: IProps) => import("react/jsx-runtime").JSX.Element;
