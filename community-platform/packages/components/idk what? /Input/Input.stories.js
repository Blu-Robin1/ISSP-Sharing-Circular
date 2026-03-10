import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from 'theme-ui';
export default {
    title: 'Forms/Input',
    component: Input,
};
export const Default = () => _jsx(Input, { placeholder: "Placeholder" });
export const Error = () => _jsx(Input, { variant: "error", value: "Invalid input" });
export const Outlined = () => (_jsx(Input, { variant: "inputOutline", placeholder: "Placeholder" }));
