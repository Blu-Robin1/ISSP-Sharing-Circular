import { jsx as _jsx } from "react/jsx-runtime";
import { MapPin } from './MapPin.client';
export default {
    title: 'Map/MapPin',
    component: MapPin,
};
export const Default = () => {
    const position = { lat: 0, lng: 0 };
    return (_jsx(MapPin, { position: position, onDrag: (lng) => {
            position.lng = lng;
        } }));
};
