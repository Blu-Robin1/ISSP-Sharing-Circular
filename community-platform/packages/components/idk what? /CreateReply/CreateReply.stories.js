import { jsx as _jsx } from "react/jsx-runtime";
import { CreateReply } from './CreateReply';
export default {
    title: 'Commenting/CreateReply',
    component: CreateReply,
};
export const Default = () => {
    return (_jsx(CreateReply, { commentId: '23543bh', isLoggedIn: false, maxLength: 75, onSubmit: () => Promise.resolve() }));
};
export const LoggedIn = () => {
    return (_jsx(CreateReply, { commentId: '23543bh', isLoggedIn: true, maxLength: 1000, onSubmit: () => Promise.resolve() }));
};
export const LoggedInWithError = () => {
    return (_jsx(CreateReply, { commentId: '23543bh', isLoggedIn: true, maxLength: 1000, onSubmit: async () => {
            return Promise.reject(new Error('Error!'));
        } }));
};
