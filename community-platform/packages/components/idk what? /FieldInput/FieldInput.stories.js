import { jsx as _jsx } from "react/jsx-runtime";
import { FieldInput } from './FieldInput';
export default {
    title: 'Forms/FieldInput',
    component: FieldInput,
};
export const Default = () => (_jsx(FieldInput, { placeholder: "Input placeholder", meta: {}, input: {} }));
export const WithError = () => (_jsx(FieldInput, { placeholder: "Text area input", input: {}, meta: { error: 'What an error', touched: true } }));
