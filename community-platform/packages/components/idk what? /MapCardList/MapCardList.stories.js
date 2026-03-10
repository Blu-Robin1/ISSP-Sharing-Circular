import { jsx as _jsx } from "react/jsx-runtime";
import { MapCardList } from './MapCardList';
export default {
    title: 'Map/CardList',
    component: MapCardList,
};
const list = [
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
export const Default = () => {
    return (_jsx(MapCardList, { list: list, onPinClick: onPinClick, selectedPin: undefined, viewport: "stories" }));
};
export const WhenDisplayIsZero = () => {
    return (_jsx(MapCardList, { list: [], onPinClick: onPinClick, selectedPin: undefined, viewport: "stories" }));
};
