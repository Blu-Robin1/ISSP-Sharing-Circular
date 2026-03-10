import { jsx as _jsx } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { BlockedRoute } from './BlockedRoute';
export default {
    title: 'Layout/BlockedRoute',
    component: BlockedRoute,
};
export const Default = () => (_jsx(BlockedRoute, { children: faker.lorem.sentences(2) }));
export const OverrideButton = () => (_jsx(BlockedRoute, { redirectLabel: "A custom call to action", redirectUrl: "/another-url", children: faker.lorem.sentences(2) }));
