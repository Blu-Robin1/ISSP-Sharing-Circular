import type { DivIcon } from 'leaflet';
import type { Map as MapType } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
export interface Props {
    mapRef: React.RefObject<MapType | null>;
    position: {
        lat: number;
        lng: number;
    };
    markerIcon?: DivIcon;
    updatePosition: (position: {
        lat: number;
        lng: number;
    }) => void;
    center?: any;
    zoom?: number;
    onClickMapPin?: () => void;
    popup?: React.ReactNode;
}
export declare const MapWithPin: (props: Props) => import("react/jsx-runtime").JSX.Element;
