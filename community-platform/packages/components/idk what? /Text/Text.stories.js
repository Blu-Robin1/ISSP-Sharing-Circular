import { jsx as _jsx } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { Text } from 'theme-ui';
export default {
    title: 'Components/Text',
    component: Text,
};
export const Default = () => _jsx(Text, { children: faker.lorem.paragraphs(3) });
export const Quiet = () => (_jsx(Text, { variant: "quiet", children: faker.lorem.paragraphs(3) }));
