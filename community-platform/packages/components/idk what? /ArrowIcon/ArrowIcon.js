import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import './styles.css';
export const Arrow = ({ disabled, direction, onClick, sx }) => {
    const glyph = direction === 'left' ? 'chevron-left' : 'chevron-right';
    return (_jsx(Flex, { sx: {
            overflow: 'hidden',
            alignItems: 'center',
            ...sx,
        }, children: disabled ? null : (_jsx(Flex, { sx: {
                width: ['35px', '35px', '45px'],
                height: ['35px', '35px', '45px'],
                border: '3px solid #000',
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
            }, children: _jsx(Icon, { sx: {
                    position: 'relative',
                    // Properly center the icon for arrows as they can look offset
                    left: direction === 'right' ? '1px' : '-1px',
                }, glyph: glyph, size: 35, onClick: onClick, className: "arrow-" }) })) }));
};
