import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { EMPTY_LIST, MapCardList } from './MapCardList';
const defaultList = [
    {
        id: 1,
        profile: {
            type: {
                id: 1,
                name: 'member',
                displayName: 'Member',
            },
        },
        moderation: 'accepted',
        lat: 0,
        lng: 0,
    },
    {
        id: 2,
        moderation: 'accepted',
        profile: {
            type: {
                id: 2,
                name: 'collection-point',
                displayName: 'Collection Point',
            },
        },
        lat: 10,
        lng: -38,
    },
    {
        id: 3,
        profile: {
            type: {
                id: 1,
                name: 'member',
                displayName: 'Member',
            },
        },
        moderation: 'accepted',
        lat: 102,
        lng: 30,
    },
    {
        id: 4,
        profile: {
            type: {
                id: 1,
                name: 'member',
                displayName: 'Member',
            },
        },
        moderation: 'accepted',
        lat: 0,
        lng: 73,
    },
];
const onPinClick = () => undefined;
const defaultProps = {
    list: defaultList,
    onPinClick,
    selectedPin: undefined,
    viewport: 'stories',
};
describe('CardList', () => {
    it('Shows all items when no filtering is done', () => {
        const { getAllByTestId } = render(_jsx(MapCardList, { ...defaultProps }));
        expect(getAllByTestId('CardListItem').length).toBe(4);
    });
    it('Shows the no item label when filtered items is empty', () => {
        const { getByText } = render(_jsx(MapCardList, { ...defaultProps, list: [] }));
        expect(getByText(EMPTY_LIST)).toBeInTheDocument();
    });
});
