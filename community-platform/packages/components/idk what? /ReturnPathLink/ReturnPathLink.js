import { jsx as _jsx } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router';
export const ReturnPathLink = (props) => {
    const location = useLocation();
    const to = `${props.to}?returnUrl=${encodeURIComponent(location?.pathname)}`;
    return (_jsx(Link, { ...props, to: to, children: props.children }));
};
