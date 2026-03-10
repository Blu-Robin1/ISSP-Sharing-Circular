import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { MemberBadge } from './MemberBadge';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/MemberBadge',
    component: MemberBadge,
};
const machineBuilder = {
    name: 'machine-builder',
    description: 'A machine builder profile',
    displayName: 'Machine Builder',
    id: 1,
    imageUrl: faker.image.avatar(),
    mapPinName: 'Machine Builder',
    order: 1,
    smallImageUrl: faker.image.avatar(),
    isSpace: true,
};
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
export const Basic = () => _jsx(MemberBadge, {});
export const Sizes = {
    render: (args) => (_jsxs(_Fragment, { children: [_jsx(MemberBadge, { size: args.size }), _jsx(MemberBadge, { size: (args.size || 40) * 2 }), _jsx(MemberBadge, { size: (args.size || 40) * 3 })] })),
};
export const TypeMember = () => (_jsxs(_Fragment, { children: [_jsx(MemberBadge, { size: 100, profileType: member }), _jsx(MemberBadge, { size: 100, profileType: member, useLowDetailVersion: true })] }));
export const TypeMachineBuilder = () => (_jsxs(_Fragment, { children: [_jsx(MemberBadge, { size: 100, profileType: machineBuilder }), _jsx(MemberBadge, { size: 100, profileType: machineBuilder, useLowDetailVersion: true })] }));
