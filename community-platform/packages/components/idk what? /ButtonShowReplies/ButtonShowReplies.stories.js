import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { createFakeCommentsSB } from '../utils';
import { ButtonShowReplies } from './ButtonShowReplies';
export default {
    title: 'Components/ButtonShowReplies',
    component: ButtonShowReplies,
};
export const DefaultComponent = () => {
    const [isShowReplies, setIsShowReplies] = useState(false);
    const replies = createFakeCommentsSB(7);
    return (_jsx(ButtonShowReplies, { replies: replies, isShowReplies: isShowReplies, setIsShowReplies: () => setIsShowReplies(!isShowReplies) }));
};
export const Default = () => {
    return _jsx(DefaultComponent, {});
};
export const RepliesShowing = () => {
    const replies = createFakeCommentsSB(6);
    return _jsx(ButtonShowReplies, { isShowReplies: true, replies: replies, setIsShowReplies: () => null });
};
export const OneReply = () => {
    const replies = createFakeCommentsSB(1);
    return (_jsx(ButtonShowReplies, { isShowReplies: false, replies: replies, setIsShowReplies: () => null }));
};
export const NoReplies = () => {
    return _jsx(ButtonShowReplies, { isShowReplies: false, replies: [], setIsShowReplies: () => null });
};
export const NoCreatorName = () => {
    const replies = createFakeCommentsSB(1);
    return (_jsx(ButtonShowReplies, { isShowReplies: false, replies: replies, setIsShowReplies: () => null }));
};
