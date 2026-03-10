import { jsx as _jsx } from "react/jsx-runtime";
import { IconCountWithTooltip } from './IconCountWithTooltip';
export default {
    title: 'Components/IconCountWithTooltip',
    component: IconCountWithTooltip,
};
export const Default = () => (_jsx(IconCountWithTooltip, { count: 345, icon: "show", text: "Number of Views" }));
export const LargeCount = () => (_jsx(IconCountWithTooltip, { count: 1500, icon: "show", text: "Number of Views" }));
export const VeryLargeCount = () => (_jsx(IconCountWithTooltip, { count: 2099999, icon: "show", text: "Number of Views" }));
