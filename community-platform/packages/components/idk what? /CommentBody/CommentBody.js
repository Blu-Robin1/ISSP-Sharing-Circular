import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useEffect, useState } from 'react';
import { Text } from 'theme-ui';
import { LinkifyText } from '../LinkifyText/LinkifyText';
const SHORT_COMMENT = 129;
export const CommentBody = ({ body }) => {
    const textRef = createRef();
    const [textHeight, setTextHeight] = useState(0);
    const [isShowMore, setShowMore] = useState(false);
    useEffect(() => {
        if (textRef.current) {
            setTextHeight(textRef.current.scrollHeight);
        }
    }, [textRef]);
    const showMore = () => {
        setShowMore((prev) => !prev);
    };
    const maxHeight = isShowMore ? 'max-content' : '128px';
    return (_jsxs(_Fragment, { children: [_jsx(Text, { "data-cy": "comment-text", "data-testid": "commentText", sx: {
                    fontFamily: 'body',
                    lineHeight: 1.3,
                    maxHeight,
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    fontSize: [2, 3],
                }, ref: textRef, children: _jsx(LinkifyText, { children: body.trim() }) }), textHeight > SHORT_COMMENT && (_jsx(Text, { as: "a", onClick: showMore, sx: {
                    color: 'gray',
                    cursor: 'pointer',
                    fontSize: [2, 3],
                }, children: isShowMore ? 'Show less' : 'Show more' }))] }));
};
