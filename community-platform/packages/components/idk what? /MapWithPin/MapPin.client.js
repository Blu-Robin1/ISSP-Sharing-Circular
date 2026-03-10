import { jsx as _jsx } from "react/jsx-runtime";
import L from 'leaflet';
import { useRef } from 'react';
import { Marker } from 'react-leaflet';
import customMarkerIcon from '../../assets/icons/map-marker.png';
const customMarker = L.icon({
    iconUrl: customMarkerIcon,
    iconSize: [20, 28],
    iconAnchor: [10, 28],
});
export const MapPin = (props) => {
    const markerRef = useRef(null);
    const handleDrag = () => {
        const marker = markerRef.current;
        if (!marker) {
            return;
        }
        const markerLatLng = marker.leafletElement.getLatLng();
        if (props.onDrag) {
            props.onDrag(markerLatLng);
        }
    };
    return (_jsx(Marker, { draggable: true, onDrag: handleDrag, position: [props.position.lat, props.position.lng], ref: markerRef, icon: props.markerIcon || customMarker, onclick: props.onClick }));
};
