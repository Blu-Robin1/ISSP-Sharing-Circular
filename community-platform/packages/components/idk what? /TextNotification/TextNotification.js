import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from '@emotion/react';
import { Alert, Close } from 'theme-ui';
const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-50%)' },
    to: { opacity: 1 },
});
export const TextNotification = (props) => {
    if (!props.isVisible) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs(Alert, { variant: props.variant, "data-cy": `TextNotification: ${props.variant}`, sx: {
            width: '100%',
            animation: `${fadeIn} ease-out 400ms both 200ms`,
        }, children: [props.children, props.onDismiss && (_jsx(Close, { sx: {
                    position: 'absolute',
                    top: '50%',
                    right: 2,
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }, onClick: () => props.onDismiss(false) }))] }));
};
