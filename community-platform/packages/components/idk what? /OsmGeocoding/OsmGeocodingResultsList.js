import { jsx as _jsx } from "theme-ui/jsx-runtime";
/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui';
export const OsmGeocodingResultsList = (props) => {
    const { results, callback, setShowResults } = props;
    return (_jsx(Box, { "data-cy": "osm-geocoding-results", as: "ul", sx: {
            background: 'white',
            padding: 0,
            position: 'relative',
            zIndex: 1,
            margin: '-2px 0 0',
            border: `2px solid black`,
            borderTopWidth: '1px',
            listStyle: 'none',
            borderRadius: 0,
            borderBottomLeftRadius: 1,
            borderBottomRightRadius: 1,
        }, children: results.map((result, index) => (_jsx(Box, { as: "li", sx: {
                paddingY: 1,
                paddingX: 2,
                lineHeight: 1.5,
                '&:hover': {
                    background: 'softblue',
                    cursor: 'pointer',
                },
            }, onClick: () => {
                setShowResults(false);
                if (callback) {
                    callback(result);
                }
            }, children: result?.display_name }, index))) }));
};
