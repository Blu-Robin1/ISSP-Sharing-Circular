import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { Tooltip } from 'react-tooltip';
import { Image } from 'theme-ui';
export const UserBadge = ({ badge }) => {
    const uuid = useId();
    return (_jsxs(_Fragment, { children: [_jsx(Image, { src: badge.imageUrl, sx: { ml: 1, height: 16, width: 16 }, "data-testid": `Username: ${badge.name} badge`, "data-tooltip-id": uuid, "data-tooltip-content": badge.displayName }), _jsx(Tooltip, { id: uuid })] }));
};
