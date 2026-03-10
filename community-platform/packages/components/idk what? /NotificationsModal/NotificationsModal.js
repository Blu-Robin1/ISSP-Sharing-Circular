import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { animated, useTransition } from '@react-spring/web';
import { Box, Flex } from 'theme-ui';
export const NotificationsModal = (props) => {
    const { children, isOpen } = props;
    const transitions = useTransition(isOpen, {
        from: { transform: 'translateY(-100%)' },
        enter: { transform: 'translateY(0%)' },
        leave: { transform: 'translateY(-100%)' },
        config: { duration: 200 },
    });
    return (_jsx(_Fragment, { children: transitions((style, item) => item && (_jsx(animated.div, { style: {
                ...style,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'white',
                zIndex: 4000,
            }, children: _jsx(Flex, { sx: {
                    background: 'white',
                    padding: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '800px',
                    maxWidth: '100vw',
                    height: '100%',
                    maxHeight: '100%',
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 4001,
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                }, children: _jsx(Box, { sx: { marginTop: 15 }, children: children }) }) }))) }));
};
