import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'theme-ui';
import { Icon } from '../Icon/Icon';
export const ButtonIcon = (props) => {
    return (_jsx(Button, { ...props, sx: { background: 'white', borderRadius: 99, padding: 1, ...props.sx }, children: _jsx(Icon, { glyph: props.icon, size: 18 }) }));
};
