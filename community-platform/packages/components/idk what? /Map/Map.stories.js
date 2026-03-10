import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Map } from './Map.client';
export default {
    title: 'Map/Map',
    component: Map,
};
export const Default = () => {
    const [zoom, setZoom] = useState(1);
    return (_jsx(Map, { zoom: zoom, setZoom: setZoom, style: {
            height: '450px',
            width: '800px',
        }, center: [0, 0] }));
};
