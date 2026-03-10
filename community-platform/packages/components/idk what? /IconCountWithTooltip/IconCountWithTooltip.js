import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId } from 'react';
import { Text } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
function shortFormatNumber(num) {
    const units = [
        { value: 1000000, suffix: 'M' },
        { value: 1000, suffix: 'K' },
    ];
    for (const { value, suffix } of units) {
        if (num >= value) {
            return (num / value).toFixed(1).replace(/\.0$/, '') + suffix;
        }
    }
    return num.toString();
}
export const IconCountWithTooltip = (props) => {
    const { count, dataCy, icon, text } = props;
    const id = useId();
    const countText = shortFormatNumber(count);
    return (_jsxs(_Fragment, { children: [_jsxs(Text, { "data-cy": dataCy, "data-tooltip-id": id, "data-tooltip-content": text, color: "black", sx: {
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    fontSize: [1, 2, 2],
                }, children: [countText, _jsx(Icon, { glyph: icon, ml: 1 })] }), _jsx(Tooltip, { id: id })] }));
};
