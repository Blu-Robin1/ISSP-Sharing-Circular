import { jsx as _jsx } from "react/jsx-runtime";
import { CommentsTitle } from './CommentsTitle';
export default {
    title: 'Commenting/CommentsTitle',
    component: CommentsTitle,
};
export const NoComments = () => _jsx(CommentsTitle, { comments: [] });
export const OneComment = () => {
    const comment = {};
    return _jsx(CommentsTitle, { comments: [comment] });
};
export const MultipleComments = () => {
    const comment = {};
    return _jsx(CommentsTitle, { comments: [comment, comment, comment] });
};
