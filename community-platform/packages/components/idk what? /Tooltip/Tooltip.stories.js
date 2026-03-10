import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'theme-ui';
import { Tooltip } from './Tooltip';
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};
export const Hover = () => (_jsxs(_Fragment, { children: [_jsx(Button, { "data-tooltip-id": "tooltip", "data-tooltip-content": "This is a tooltip", children: "Hover over me" }), _jsx(Tooltip, { id: "tooltip" })] }));
