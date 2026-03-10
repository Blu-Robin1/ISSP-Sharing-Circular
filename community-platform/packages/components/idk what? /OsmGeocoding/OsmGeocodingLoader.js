import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Text } from 'theme-ui';
export const OsmGeocodingLoader = () => {
    return (_jsx(_Fragment, { children: _jsx(Box, { sx: {
                background: 'white',
                position: 'relative',
                zIndex: 1,
                marginTop: '-2px',
                paddingX: 2,
                paddingY: 1,
                border: '2px solid',
                borderColor: 'black',
                borderTopWidth: '1px',
                lineHeight: 1.5,
                borderBottomLeftRadius: 1,
                borderBottomRightRadius: 1,
            }, children: _jsx(Text, { sx: { fontSize: 1 }, children: "Fetching results from Open Street Map" }) }) }));
};
