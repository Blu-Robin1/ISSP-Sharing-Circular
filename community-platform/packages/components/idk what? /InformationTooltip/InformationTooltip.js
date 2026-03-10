import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { Tooltip } from 'react-tooltip';
import { Icon } from '../Icon/Icon';
export const InformationTooltip = (props) => {
    const id = useId();
    return (_jsxs(_Fragment, { children: [_jsx(Icon, { ...props, "data-tooltip-id": id }), _jsx(Tooltip, { id: id, children: _jsx("p", { dangerouslySetInnerHTML: { __html: props.tooltip }, style: { textAlign: 'center', margin: 0 } }) })] }));
};
