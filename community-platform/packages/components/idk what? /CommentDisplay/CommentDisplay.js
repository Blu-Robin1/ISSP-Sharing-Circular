import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { ActionSet } from '../ActionSet/ActionSet';
import { Button } from '../Button/Button';
import { CommentAvatar } from '../CommentAvatar/CommentAvatar';
import { CommentBody } from '../CommentBody/CommentBody';
import { DisplayDate } from '../DisplayDate/DisplayDate';
import { AuthorsContext } from '../providers/AuthorsContext';
import { UsefulButtonLite } from '../UsefulStatsButton/UsefulButtonLite';
import { Username } from '../Username/Username';
const DELETED_COMMENT = 'The original comment got deleted';
export const CommentDisplay = (props) => {
    const { comment, itemType, isEditable, followButton, followButtonIcon, setShowDeleteModal, setShowEditModal, handleCopyLink, usefulButtonConfig, } = props;
    const { authors } = useContext(AuthorsContext);
    const border = `${comment.highlighted ? '2px dashed black' : 'none'}`;
    if (comment.deleted) {
        return (_jsx(Box, { sx: {
                marginBottom: 2,
                border,
            }, "data-cy": "deletedComment", children: _jsxs(Text, { sx: { color: 'grey' }, children: ["[", DELETED_COMMENT, "]"] }) }));
    }
    if (!comment.deleted) {
        return (_jsxs(Flex, { sx: {
                gap: 2,
                flexGrow: 1,
                border,
            }, "data-cy": comment.highlighted ? 'highlighted-comment' : '', children: [_jsx(Box, { "data-cy": "commentAvatar", "data-testid": "commentAvatar", sx: {
                        flexDirection: 'column',
                        position: 'relative',
                        display: 'inline-block',
                    }, children: _jsx(CommentAvatar, { displayName: comment.createdBy?.displayName, photo: comment.createdBy?.photo?.publicUrl, isCommentAuthor: comment.createdBy?.id ? authors.includes(comment.createdBy?.id) : false }) }), _jsx(Flex, { sx: { flexDirection: 'column', flex: 1 }, children: _jsxs(Flex, { sx: {
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            gap: 1,
                        }, children: [_jsxs(Flex, { sx: {
                                    gap: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }, children: [_jsxs(Flex, { sx: { alignItems: 'center', gap: 2 }, children: [comment.createdBy && _jsx(Username, { user: comment.createdBy }), _jsx(Text, { sx: { fontSize: 1, color: 'darkGrey' }, children: _jsx(DisplayDate, { createdAt: comment.createdAt, showLabel: false }) })] }), _jsxs(Flex, { sx: { alignItems: 'center', gap: 1 }, children: [followButtonIcon, _jsxs(ActionSet, { itemType: itemType, children: [followButton, isEditable && (_jsx(Button, { type: "button", "data-cy": `${itemType}: edit button`, variant: "subtle", icon: "edit", onClick: () => setShowEditModal(true), sx: { fontSize: 1 }, children: "Edit" })), _jsx(Button, { type: "button", "data-cy": `${itemType}: copy link button`, variant: "subtle", icon: "copy-link", onClick: handleCopyLink, sx: { fontSize: 1 }, children: "Copy Link" }), isEditable && (_jsx(Button, { type: "button", "data-cy": `${itemType}: delete button`, variant: "subtle", icon: "delete", onClick: () => setShowDeleteModal(true), sx: { fontSize: 1 }, children: "Delete" }))] })] })] }), _jsxs(Flex, { sx: {
                                    flexDirection: 'column',
                                }, children: [_jsx(CommentBody, { body: comment.comment }), _jsx(UsefulButtonLite, { usefulButtonLiteConfig: usefulButtonConfig })] })] }) })] }));
    }
};
