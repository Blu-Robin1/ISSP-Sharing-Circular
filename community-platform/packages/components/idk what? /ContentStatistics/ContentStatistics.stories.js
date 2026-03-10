import { jsx as _jsx } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { ContentStatistics } from './ContentStatistics';
export default {
    title: 'Layout/ContentStatistics',
    component: ContentStatistics,
};
export const Default = () => (_jsx(ContentStatistics, { statistics: [
        {
            icon: 'show',
            label: `${faker.number.int()} views`,
            stat: faker.number.int(),
        },
        {
            icon: 'star',
            label: `${faker.number.int()} useful`,
            stat: faker.number.int(),
        },
        {
            icon: 'comment',
            label: `${faker.number.int()} comments`,
            stat: faker.number.int(),
        },
        {
            icon: 'update',
            label: `${faker.number.int()} steps`,
            stat: faker.number.int(),
        },
    ] }));
export const SingleCount = () => (_jsx(ContentStatistics, { statistics: [
        {
            icon: 'show',
            label: '1 view',
            stat: 1,
        },
        {
            icon: 'star',
            label: '1 useful',
            stat: 1,
        },
        {
            icon: 'comment',
            label: '1 comment',
            stat: 1,
        },
        {
            icon: 'update',
            label: '1 step',
            stat: 1,
        },
    ] }));
