import { jsx as _jsx } from "react/jsx-runtime";
// As much as possible taken directly from https://asmyshlyaev177.github.io/react-horizontal-scrolling-menu/?path=/story/examples-simple--simple
// Generally only edited for readability
import styled from '@emotion/styled';
import { Children, cloneElement, isValidElement, useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box } from 'theme-ui';
import { Arrow } from '../ArrowIcon/ArrowIcon';
import 'react-horizontal-scrolling-menu/dist/styles.css';
export const LeftArrow = () => {
    const visibility = useContext(VisibilityContext);
    const disabled = visibility.useLeftArrowVisible();
    const onClick = () => visibility.scrollToItem(visibility.getPrevElement(), 'smooth', 'start');
    return (_jsx(Arrow, { disabled: disabled, direction: "left", sx: { marginLeft: '10px' }, onClick: onClick }));
};
export const RightArrow = () => {
    const visibility = useContext(VisibilityContext);
    const disabled = visibility.useRightArrowVisible();
    const onClick = () => visibility.scrollToItem(visibility.getNextElement(), 'smooth', 'end');
    return (_jsx(Arrow, { disabled: disabled, direction: "right", sx: { marginRight: '10px' }, onClick: onClick }));
};
export const VerticalList = ({ children, dataCy }) => {
    const childrenWithIds = Children.map(children, (child, index) => {
        if (isValidElement(child) && !child.props.itemID) {
            return cloneElement(child, { itemID: `item-${index}` });
        }
        return child;
    })?.filter((x) => !!x);
    return (_jsx(Box, { "data-cy": dataCy, sx: { alignSelf: 'center', maxWidth: '100%' }, children: _jsx(NoScrollbar, { children: _jsx(ScrollMenu, { LeftArrow: LeftArrow, RightArrow: RightArrow, onWheel: onWheel, children: childrenWithIds }) }) }));
};
const NoScrollbar = styled('div')({
    '& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar': {
        display: 'none',
    },
    '& .react-horizontal-scrolling-menu--scroll-container': {
        display: 'flex',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
});
function onWheel(apiObj, ev) {
    // NOTE: no good standard way to distinguish touchpad scrolling gestures
    // but can assume that gesture will affect X axis, mouse scroll only Y axis
    // of if deltaY too small probably is it touchpad
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }
    if (ev.deltaY < 0) {
        apiObj.scrollNext();
    }
    else {
        apiObj.scrollPrev();
    }
}
