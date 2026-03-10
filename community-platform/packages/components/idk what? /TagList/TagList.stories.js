import { jsx as _jsx } from "react/jsx-runtime";
import { TagList } from './TagList';
export default {
    title: 'Components/TagList',
    component: TagList,
};
export const Default = () => (_jsx(TagList, { tags: [
        {
            label: 'Tag 1',
        },
        {
            label: 'Tag 2',
        },
    ] }));
