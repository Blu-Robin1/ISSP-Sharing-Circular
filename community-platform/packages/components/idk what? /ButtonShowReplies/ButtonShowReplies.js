import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../Button/Button';
export const ButtonShowReplies = (props) => {
    const { isShowReplies, replies, setIsShowReplies } = props;
    const count = replies.filter(({ deleted }) => deleted !== true).length;
    const icon = isShowReplies ? 'chevron-up' : 'chevron-down';
    const text = count
        ? isShowReplies
            ? `Hide ${count} ${count === 1 ? 'reply' : 'replies'}`
            : `Show ${count} ${count === 1 ? 'reply' : 'replies'}`
        : isShowReplies
            ? `Hide`
            : `Reply`;
    return (_jsx(Button, { type: "button", "data-cy": "show-replies", "data-testid": "show-replies", icon: icon, onClick: setIsShowReplies, sx: { alignSelf: 'flex-start' }, variant: "subtle", small: true, children: text }));
};
