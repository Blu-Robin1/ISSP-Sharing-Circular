import { jsx as _jsx } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { PinProfile } from './PinProfile';
export default {
    title: 'Map/PinProfile',
    component: PinProfile,
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
            type: {
                id: 1,
                name: 'member',
                displayName: 'Member',
            },
        },
    };
    return (_jsx("div", { style: { width: '230px', position: 'fixed' }, children: _jsx(PinProfile, { item: item, onClose: () => console.log() }) }));
};
export const DefaultSpace = () => {
    const item = {
        id: 2,
        lat: 0,
        lng: 0,
        moderation: 'accepted',
        administrative: '',
        country: 'United Kingdom',
        countryCode: 'UK',
        profile: {
            id: 3,
            photo: {
                publicUrl: faker.image.avatar(),
            },
            about: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Lorem ipsum odor amet, consectetuer adipiscing elit.',
            badges: [
                {
                    id: 1,
                    name: 'supporter',
                    displayName: 'Supporter',
                    actionUrl: 'https://www.patreon.com/one_army',
                    imageUrl: faker.image.avatar(),
                },
            ],
            displayName: 'user',
            isContactable: true,
            type: {
                id: 2,
                name: 'workspace',
                displayName: 'Workspace',
            },
            tags: [{ name: 'Sheetpress', id: 1 }],
        },
    };
    return (_jsx("div", { style: { width: '230px', position: 'fixed' }, children: _jsx(PinProfile, { item: item, onClose: () => console.log() }) }));
};
