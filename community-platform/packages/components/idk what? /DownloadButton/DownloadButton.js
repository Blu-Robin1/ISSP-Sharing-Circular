import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
export const DownloadButton = (props) => {
    const { glyph, isLoggedIn, label, onClick } = props;
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { sx: {
                    padding: 2,
                    background: 'accent.base',
                    border: '2px solid black',
                    flexDirection: 'row',
                    maxWidth: '300px',
                    borderRadius: 1,
                    cursor: 'pointer',
                    gap: 2,
                }, onClick: onClick, "data-cy": "downloadButton", "data-testid": "downloadButton", "data-tooltip-id": "download-files", "data-tooltip-content": !isLoggedIn ? 'Login to download' : '', children: [_jsx(Icon, { size: 24, glyph: glyph || 'external-url' }), _jsx(Text, { sx: {
                            flex: 1,
                            fontSize: 1,
                            color: 'black',
                            overflowWrap: 'break-word',
                            alignSelf: label ? 'flex-start' : 'center',
                        }, children: label ? label : 'Download files' })] }), _jsx(Tooltip, { id: "download-files" })] }));
};
