import { jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'theme-ui';
// Duplicated util from main app - should be in 'shared' once the setup
// is right with typing and testing
const numberWithCommas = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
};
export const DownloadCounter = ({ total }) => {
    return (_jsxs(Text, { "data-cy": "file-download-counter", sx: {
            fontSize: 1,
            color: 'grey',
        }, children: [numberWithCommas(total || 0), total !== 1 ? ' downloads' : ' download'] }));
};
