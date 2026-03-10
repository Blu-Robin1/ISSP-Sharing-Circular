import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { FieldTextarea } from './FieldTextarea';
export default {
    title: 'Forms/FieldTextarea',
    component: FieldTextarea,
};
export const Default = () => (_jsx(FieldTextarea, { input: {}, placeholder: "Text area input", meta: {} }));
export const WithoutResizeHandle = () => (_jsx(FieldTextarea, { input: {}, placeholder: "Text area input is not resizable", sx: { resize: 'none' }, meta: { error: 'What an error', touched: true } }));
export const WithError = () => (_jsx(FieldTextarea, { input: {}, placeholder: "Text area input", meta: { error: 'What an error', touched: true } }));
const characterCountValues = [
    {
        currentSize: 5,
        minSize: 0,
        maxSize: 200,
        error: null,
    },
    {
        currentSize: 25,
        minSize: 50,
        maxSize: 200,
        error: 'Character count must be a greater than 50 characters',
    },
    {
        currentSize: 500,
        minSize: 0,
        maxSize: 100,
        error: 'Character count must be a less than 100 characters',
    },
];
export const WithCharacterCounts = () => (_jsx(_Fragment, { children: characterCountValues.map((state, index) => {
        return (_jsx(FieldTextarea, { input: { value: 'Hello '.repeat(Math.round(state.currentSize / 6)) }, placeholder: "Text area input", meta: { touched: true }, minLength: state.minSize, maxLength: state.maxSize, showCharacterCount: true }, index));
    }) }));
export const CustomRowHeight = () => (_jsx(FieldTextarea, { input: {}, placeholder: "Text area input", meta: {}, rows: 10 }));
