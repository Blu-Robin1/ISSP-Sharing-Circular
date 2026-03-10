import { jsx as _jsx } from "react/jsx-runtime";
import { Heading } from 'theme-ui';
export default {
    title: 'Layout/Heading',
    component: Heading,
};
export const Default = () => _jsx(Heading, { children: "Default Heading style" });
export const Small = () => (_jsx(Heading, { variant: "small", children: "Default Heading style" }));
