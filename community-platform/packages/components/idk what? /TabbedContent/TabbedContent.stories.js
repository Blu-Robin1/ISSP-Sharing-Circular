import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faker } from '@faker-js/faker';
import { Box } from 'theme-ui';
import { Tab, TabPanel, Tabs, TabsList } from './TabbedContent';
export default {
    title: 'Components/TabbedContent',
};
export const Default = () => {
    return (_jsx(Box, { sx: {
            background: 'white',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: 6,
        }, children: _jsxs(Tabs, { defaultValue: 0, children: [_jsxs(TabsList, { children: [_jsx(Tab, { children: "Tab #1" }), _jsx(Tab, { children: "Tab #2" }), _jsx(Tab, { children: "Tab #3" }), _jsx(Tab, { children: "Tab #4" }), _jsx(Tab, { children: "Tab #5" })] }), _jsxs(TabPanel, { children: [_jsx("p", { children: "Tab Panel #1" }), _jsx("p", { children: faker.lorem.paragraphs(3) })] }), _jsxs(TabPanel, { children: [_jsx("p", { children: "Tab Panel #2" }), _jsx("p", { children: faker.lorem.paragraphs(3) })] }), _jsxs(TabPanel, { children: [_jsx("p", { children: "Tab Panel #3" }), _jsx("p", { children: faker.lorem.paragraphs(3) })] }), _jsxs(TabPanel, { children: [_jsx("p", { children: "Tab Panel #4" }), _jsx("p", { children: faker.lorem.paragraphs(3) })] }), _jsxs(TabPanel, { children: [_jsx("p", { children: "Tab Panel #5" }), _jsx("p", { children: faker.lorem.paragraphs(3) })] })] }) }));
};
