import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { MapWithPin } from './MapWithPin.client';
export default {
    title: 'Map/MapWithPin',
    component: MapWithPin,
};
export const Default = () => {
    const position = { lat: 0, lng: 0 };
    const newMapRef = useRef(null);
    return (_jsx(MapWithPin, { mapRef: newMapRef, position: position, updatePosition: (_position) => {
            position.lat = _position.lat;
            position.lng = _position.lng;
        } }));
};
