import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ZoomControl } from 'react-leaflet';
import { Box, Flex } from 'theme-ui';
// biome-ignore lint/suspicious/noShadowRestrictedNames: this is an external library import
import { Map } from '../Map/Map.client';
import { OsmGeocoding } from '../OsmGeocoding/OsmGeocoding';
import { MapPin } from './MapPin.client';
import 'leaflet/dist/leaflet.css';
export const MapWithPin = (props) => {
    const [zoom, setZoom] = useState(props.zoom || 1);
    const [center, setCenter] = useState(props.center || [props.position.lat, props.position.lng]);
    const { mapRef, position, markerIcon, onClickMapPin, popup } = props;
    return (_jsx(Flex, { sx: { flexDirection: 'column', gap: 2 }, children: _jsxs("div", { style: {
                position: 'relative',
                borderRadius: 6,
                overflow: 'hidden',
            }, children: [_jsx(Box, { sx: {
                        position: 'absolute',
                        zIndex: 2,
                        padding: 4,
                        top: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, children: _jsx(Flex, { style: { width: '280px' }, children: _jsx(OsmGeocoding, { placeholder: "Type your address", callback: (data) => {
                                if (data.lat && data.lon) {
                                    props.updatePosition({
                                        lat: Number(data.lat),
                                        lng: Number(data.lon),
                                    });
                                    setCenter([data.lat, data.lon]);
                                    setZoom(15);
                                }
                            }, acceptLanguage: "en" }) }) }), _jsxs(Map, { ref: mapRef, className: "markercluster-map settings-page", center: center, zoom: zoom, zoomControl: false, setZoom: setZoom, onclick: (e) => props.updatePosition({ lat: e.latlng.lat, lng: e.latlng.lng }), doubleClickZoom: false, style: {
                        height: '360px',
                        zIndex: 1,
                    }, children: [_jsx(ZoomControl, { position: "topleft" }), _jsxs(_Fragment, { children: [popup, position?.lat && position.lng && (_jsx(MapPin, { position: position, markerIcon: markerIcon, onClick: onClickMapPin, onDrag: (evt) => {
                                        if (evt.lat && evt.lng)
                                            props.updatePosition({
                                                lat: evt.lat,
                                                lng: evt.lng,
                                            });
                                    } }))] })] })] }) }));
};
