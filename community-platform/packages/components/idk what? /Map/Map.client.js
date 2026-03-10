import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
// biome-ignore lint/suspicious/noShadowRestrictedNames: this is an external library import
export const Map = forwardRef((props, ref) => {
    const onViewportChanged = (viewport) => {
        if (viewport.zoom) {
            props.setZoom(viewport.zoom);
        }
    };
    return (_jsxs(LeafletMap, { ref: ref, onViewportChanged: onViewportChanged, ...props, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors \u00A9 <a href="https://carto.com/attributions">CARTO</a>', url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" }), props.children] }));
});
Map.displayName = 'Map'; // Is this needed?
