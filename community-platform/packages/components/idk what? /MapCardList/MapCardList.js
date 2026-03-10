import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { CardListItem } from '../CardListItem/CardListItem';
import { Icon } from '../Icon/Icon';
export const EMPTY_LIST = 'Oh nos! Nothing to show!';
const ITEMS_PER_RENDER = 20;
export const MapCardList = (props) => {
    const [renderCount, setRenderCount] = useState(ITEMS_PER_RENDER);
    const [displayItems, setDisplayItems] = useState([]);
    const { list, onPinClick, selectedPin, viewport } = props;
    useEffect(() => {
        setRenderCount(ITEMS_PER_RENDER);
    }, [list]);
    useEffect(() => {
        const toRender = list.slice(0, renderCount).map((item) => {
            const isSelectedPin = item.id === selectedPin?.id;
            return (_jsx(CardListItem, { item: item, isSelectedPin: isSelectedPin, onPinClick: onPinClick, viewport: viewport }, item.id));
        });
        setDisplayItems(toRender);
    }, [renderCount, list]);
    const addRenderItems = () => setRenderCount((count) => count + ITEMS_PER_RENDER);
    const hasMore = !(displayItems.length === list.length);
    const isListEmpty = list.length === 0;
    const results = `${list.length} result${list.length == 1 ? '' : 's'} in view`;
    return (_jsxs(Flex, { "data-cy": `CardList-${viewport}`, sx: { flexDirection: 'column', gap: 2, padding: 2 }, children: [_jsxs(Flex, { sx: { justifyContent: 'space-between', paddingX: 2, paddingTop: 2, fontSize: 2 }, children: [_jsx(Text, { "data-cy": "list-results", children: results }), _jsxs(Flex, { sx: { alignItems: 'center', gap: 2 }, children: [_jsx(Text, { children: "Most recently active" }), _jsx(Icon, { glyph: "arrow-full-down" })] })] }), isListEmpty && EMPTY_LIST, !isListEmpty && (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { columnCount: [1, 2, 2, 3], columnGap: 0, '& > *': { breakInside: 'avoid' } }, children: displayItems }), hasMore && (_jsx(Flex, { sx: { justifyContent: 'center' }, children: _jsx(Button, { onClick: addRenderItems, children: "Show more" }) }))] }))] }));
};
