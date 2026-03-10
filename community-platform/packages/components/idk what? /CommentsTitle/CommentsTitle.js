import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Heading } from 'theme-ui';
export const NO_COMMENTS = 'Start the discussion';
export const ONE_COMMENT = '1 Comment';
export const COMMENTS = 'Comments';
export const CommentsTitle = ({ comments }) => {
    const title = useMemo(() => {
        const commentCount = comments.filter((x) => !x.deleted).length +
            comments.flatMap((x) => x.replies).filter((x) => !!x).length;
        if (commentCount === 0) {
            return NO_COMMENTS;
        }
        if (commentCount === 1) {
            return ONE_COMMENT;
        }
        return `${commentCount} ${COMMENTS}`;
    }, [comments]);
    return (_jsx(Heading, { as: "h3", "data-cy": "DiscussionTitle", sx: { whiteSpace: 'nowrap' }, children: title }));
};
