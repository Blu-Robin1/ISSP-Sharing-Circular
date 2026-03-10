import type { RefObject } from 'react';
import type { MapProps } from 'react-leaflet';
import { Map as LeafletMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
export interface IProps extends MapProps {
    setZoom: (arg: number) => void;
    children?: React.ReactNode | React.ReactNode[];
    ref?: RefObject<LeafletMap> | undefined;
}
export declare const Map: import("react").ForwardRefExoticComponent<Omit<IProps, "ref"> & import("react").RefAttributes<LeafletMap<MapProps, import("leaflet").Map>>>;
