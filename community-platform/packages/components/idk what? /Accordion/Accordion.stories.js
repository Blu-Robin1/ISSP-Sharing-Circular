import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'theme-ui';
import { Accordion } from './Accordion';
export default {
    title: 'Components/Accordion',
    component: Accordion,
};
export const Default = () => (_jsx(Accordion, { title: "Accordion Title", children: _jsx(Text, { children: "Now you see me!" }) }));
