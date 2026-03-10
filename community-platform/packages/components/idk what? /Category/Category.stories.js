import { jsx as _jsx } from "react/jsx-runtime";
import { Category } from './Category';
export default {
    title: 'Components/Category',
    component: Category,
};
export const Default = () => (_jsx(Category, { category: {
        name: 'Label',
    } }));
