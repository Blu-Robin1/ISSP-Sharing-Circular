import { jsx as _jsx } from "react/jsx-runtime";
import ReactPlayer from 'react-player';
import { Box } from 'theme-ui';
export const VideoPlayer = ({ videoUrl }) => {
    return (_jsx(Box, { "data-testid": "VideoPlayer", children: _jsx(ReactPlayer, { width: "auto", controls: true, url: videoUrl }) }));
};
