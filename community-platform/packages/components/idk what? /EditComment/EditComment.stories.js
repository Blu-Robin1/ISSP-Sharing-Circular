import { jsx as _jsx } from "react/jsx-runtime";
import { EditComment } from './EditComment';
export default {
    title: 'Commenting/EditComment',
    component: EditComment,
};
export const Default = () => (_jsx(EditComment, { isReply: false, comment: "A short comment", setShowEditModal: () => null, handleCancel: () => null, handleSubmit: () => Promise.resolve(new Response('')) }));
export const EditReply = () => (_jsx(EditComment, { isReply: true, comment: "A short comment here...", setShowEditModal: () => null, handleCancel: () => null, handleSubmit: () => Promise.resolve(new Response('')) }));
