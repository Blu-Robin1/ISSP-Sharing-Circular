import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { DownloadButton } from '../DownloadButton/DownloadButton';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
const FileDetails = (props) => {
    const { name, glyph, size, redirectToSignIn } = props;
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { sx: {
                    borderRadius: 1,
                    border: '2px solid black',
                    background: 'accent.base',
                    color: 'black',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '300px',
                    cursor: 'pointer',
                    padding: 2,
                    marginBottom: 1,
                }, onClick: () => redirectToSignIn && redirectToSignIn(), "data-tooltip-id": "login-download", "data-tooltip-content": redirectToSignIn ? 'Login to download' : '', children: [_jsx(Icon, { size: 24, glyph: glyph, mr: 3 }), _jsx(Text, { sx: {
                            flex: 1,
                            fontSize: 1,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            marginRight: 3,
                        }, children: name }), _jsx(Text, { sx: { fontSize: 1 }, children: size })] }), _jsx(Tooltip, { id: "login-download" })] }));
};
export const DownloadStaticFile = (props) => {
    const { file, allowDownload, handleClick, redirectToSignIn, isLoggedIn } = props;
    const size = bytesToSize(file.size || 0);
    if (!file) {
        return null;
    }
    const forDownload = allowDownload && file.url && !redirectToSignIn;
    return (_jsxs(Flex, { sx: { flexDirection: 'column', gap: 1 }, children: [forDownload && (_jsx(ExternalLink, { onClick: () => handleClick && handleClick(), href: file.url, download: file.name, sx: { width: '300px', marginLeft: 0, marginRight: 1 }, children: _jsx(FileDetails, { name: file.name, glyph: "download-cloud", size: size }) })), _jsx(DownloadButton, { glyph: "download-cloud", isLoggedIn: isLoggedIn, label: `${file.name} (${size})`, onClick: () => handleClick && handleClick() })] }));
};
const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '0 Bytes';
    }
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toPrecision(3) + ' ' + sizes[i];
};
