import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Card, Flex } from 'theme-ui';
import { Button } from '../Button/Button';
export const ActionSet = ({ children, itemType }) => {
    const [show, setShow] = useState(false);
    const cardRef = useRef(null);
    const toDisplay = children.filter((child) => !!child);
    if (!children || toDisplay.length === 0) {
        return _jsx(_Fragment, {});
    }
    const onClick = () => setShow((show) => !show);
    useEffect(() => {
        const handleClickOutsideDropdownCard = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setShow((prev) => !prev);
            }
        };
        if (show)
            document.addEventListener('mousedown', handleClickOutsideDropdownCard);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdownCard);
        };
    }, [show]);
    return (_jsxs(Flex, { ref: cardRef, sx: {
            display: 'inline-block',
            position: 'relative',
            gap: 2,
        }, children: [_jsx(Button, { "data-cy": `${itemType}: ActionSetButton`, icon: "more-vert", onClick: onClick, variant: "subtle", small: true, showIconOnly: true, children: "Show Actions" }), show && (_jsx(Card, { sx: {
                    position: 'absolute',
                    right: 0,
                    zIndex: 10,
                    gap: 1,
                    minWidth: '200px',
                }, children: _jsxs(Flex, { onClick: () => setShow(false), sx: {
                        alignItems: 'stretch',
                        justifyItems: 'stretch',
                        flexDirection: 'column',
                    }, children: [...children] }) }))] }));
};
