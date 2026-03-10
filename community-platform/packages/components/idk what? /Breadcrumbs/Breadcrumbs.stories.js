import { jsx as _jsx } from "react/jsx-runtime";
import { Breadcrumbs } from './Breadcrumbs';
export default {
    title: 'Layout/Breadcrumbs',
    component: Breadcrumbs,
};
export const Default = () => (_jsx(Breadcrumbs, { steps: [
        {
            text: 'Question',
            link: '/questions',
        },
        {
            text: 'Category',
            link: '/questions?category=Category',
        },
        {
            text: 'Are we real?',
        },
    ] }));
export const NoCategory = () => (_jsx(Breadcrumbs, { steps: [
        {
            text: 'Question',
            link: '/questions',
        },
        {
            text: 'Are we real?',
        },
    ] }));
