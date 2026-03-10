import { jsx as _jsx } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { CardListItem } from './CardListItem';
export default {
    title: 'Map/CardListItem',
    component: CardListItem,
};
const onPinClick = () => undefined;
const viewport = 'desktop';
const member = {
    name: 'member',
    description: 'A member profile',
    displayName: 'Member',
    id: 2,
    imageUrl: faker.image.avatar(),
    mapPinName: 'Member',
    order: 1,
    smallImageUrl: faker.image.avatar(),
    isSpace: false,
};
const space = {
    name: 'space',
    description: 'A space profile',
    displayName: 'Space',
    id: 3,
    imageUrl: faker.image.avatar(),
    mapPinName: 'Space',
    order: 1,
    smallImageUrl: faker.image.avatar(),
    isSpace: true,
};
export const DefaultMember = () => {
    const item = {
        id: 1,
        lat: 0,
        lng: 0,
        administrative: '',
        country: 'Brazil',
        countryCode: 'BR',
        moderation: 'accepted',
        profile: {
            id: 1,
            photo: {
                publicUrl: faker.image.avatar(),
            },
            displayName: 'member_no1',
            isContactable: false,
            type: member,
        },
    };
    return (_jsx("div", { style: { width: '500px' }, children: _jsx(CardListItem, { item: item, isSelectedPin: false, onPinClick: onPinClick, viewport: viewport }) }));
};
export const DefaultSpace = () => {
    const item = {
        id: 1,
        lat: 0,
        lng: 0,
        administrative: '',
        country: 'United Kingdom',
        countryCode: 'UK',
        moderation: 'accepted',
        profile: {
            id: 1,
            photo: {
                publicUrl: faker.image.avatar(),
            },
            about: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Lorem ipsum odor amet, consectetuer adipiscing elit.',
            displayName: 'member_no1',
            isContactable: false,
            type: space,
            tags: [{ id: 1, name: 'Sheetpress' }],
        },
    };
    return (_jsx("div", { style: { width: '500px' }, children: _jsx(CardListItem, { item: item, isSelectedPin: false, onPinClick: onPinClick, viewport: viewport }) }));
};
