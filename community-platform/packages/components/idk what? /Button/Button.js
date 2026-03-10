import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, Button as ThemeUiButton } from 'theme-ui';
import { Icon } from '../Icon/Icon';
const buttonSizeProps = {
    small: {
        px: 2,
        py: 1,
        pl: '2rem',
        fontSize: 1,
        height: '2rem',
    },
    default: {
        px: 3,
        pl: 9,
    },
    large: {
        px: 4,
        py: 3,
        pl: 10,
        fontSize: 4,
        height: '3.5rem',
    },
};
function getSizeProps(size, hasIcon) {
    if (!buttonSizeProps[size] && !hasIcon) {
        return {};
    }
    if (!buttonSizeProps[size] && hasIcon) {
        return {
            px: 3,
            pl: 9,
        };
    }
    const sizeProps = { ...buttonSizeProps[size] };
    if (!hasIcon) {
        delete sizeProps.pl;
    }
    return sizeProps;
}
function getScaleTransform(size) {
    if (size === 'large') {
        return 1.25;
    }
    return 1;
}
function sanitizedProps(obj, keysToRemove) {
    const sanitizedObj = { ...obj };
    keysToRemove.forEach((prop) => {
        if (sanitizedObj[prop]) {
            delete sanitizedObj[prop];
        }
    });
    return sanitizedObj;
}
export const Button = (props) => {
    let size = 'default';
    if (props.small === true) {
        size = 'small';
    }
    else if (props.large === true) {
        size = 'large';
    }
    return (_jsxs(ThemeUiButton, { ...sanitizedProps(props, ['small', 'large', 'showIconOnly', 'iconColor', 'iconFilter']), sx: {
            ...getSizeProps(size, !!props.icon),
            ...(props.showIconOnly ? { pr: 0 } : {}),
            ...props.sx,
        }, children: [props.icon && (_jsx(Flex, { "aria-hidden": true, sx: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: getSizeProps(size, !!props.icon)?.px || 0,
                    boxSizing: 'border-box',
                    fontSize: 0,
                    maxWidth: '100%',
                    lineHeight: 0,
                    transform: `translateY(-1px) scale(${getScaleTransform(size)})`,
                    pointerEvents: 'none',
                }, children: _jsx(Icon, { glyph: props.icon, color: props.iconColor, filter: props.iconFilter }) })), _jsx(Text, { sx: {
                    ...(props.showIconOnly
                        ? {
                            clipPath: 'inset(100%)',
                            clip: 'rect(1px, 1px, 1px, 1px)',
                            height: '1px',
                            overflow: 'hidden',
                            position: 'absolute',
                            whiteSpace: 'nowrap',
                            width: '1px',
                        }
                        : {}),
                }, children: props.children })] }));
};
