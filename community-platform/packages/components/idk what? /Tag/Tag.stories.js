import { jsx as _jsx } from "react/jsx-runtime";
import { Tag } from './Tag';
export default {
    title: 'Components/Tag',
    component: Tag,
};
export const Default = () => (_jsx(Tag, { tag: {
        label: 'Label',
    } }));
