import { jsx as _jsx } from "react/jsx-runtime";
import { FieldMarkdown } from './FieldMarkdown';
export default {
    title: 'Forms/FieldMarkdown',
    component: FieldMarkdown,
};
const imageUpload = () => Promise.resolve('');
export const Default = () => (_jsx(FieldMarkdown, { imageUploadHandler: imageUpload, input: {}, placeholder: "Text area input", meta: {} }));
export const WithError = () => (_jsx(FieldMarkdown, { imageUploadHandler: imageUpload, input: {}, placeholder: "Text area input", meta: { error: 'What an error', touched: true } }));
