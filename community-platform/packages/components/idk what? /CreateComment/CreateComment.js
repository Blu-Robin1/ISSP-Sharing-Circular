import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, Flex, Image, Text, Textarea } from 'theme-ui';
import sendMobile from '../../assets/icons/contact.svg';
import { MemberBadge } from '../MemberBadge/MemberBadge';
import { ReturnPathLink } from '../ReturnPathLink/ReturnPathLink';
import './CreateComment.css';
export const CreateComment = (props) => {
    const [textareaIsFocussed, setTextareaIsFocussed] = useState(false);
    const { comment, isLoggedIn, isReply, maxLength, onSubmit, isLoading } = props;
    const placeholder = props.placeholder || 'Leave your questions or feedback...';
    const buttonLabel = props.buttonLabel ?? 'Leave a comment';
    const onChange = ({ parentNode, value }) => {
        parentNode.dataset.replicatedValue = value;
        props?.onChange(value);
    };
    const commentIsActive = comment.length > 0 || textareaIsFocussed;
    const onClick = () => {
        !isLoading && onSubmit(comment);
    };
    return (_jsxs(Flex, { "data-target": "create-comment-container", sx: { gap: 2 }, children: [_jsx(Box, { sx: {
                    lineHeight: 0,
                    display: ['none', 'block'],
                    flexShrink: 0,
                }, children: _jsx(MemberBadge, { profileType: props.profileType, useLowDetailVersion: true }) }), _jsxs(Box, { sx: {
                    display: 'block',
                    background: 'white',
                    flex: 1,
                    marginLeft: [0, 3],
                    borderRadius: 1,
                    position: 'relative',
                    width: 'min-content',
                    '&:before': {
                        display: ['none', 'block'],
                        content: '""',
                        position: 'absolute',
                        borderWidth: '1em 1em',
                        borderStyle: 'solid',
                        borderColor: 'transparent white transparent transparent',
                        margin: '.5em -2em',
                    },
                }, children: [!isLoggedIn && _jsx(LoginPrompt, {}), isLoggedIn && (_jsxs(Flex, { sx: { flexDirection: 'column' }, children: [_jsx(Box, { className: `grow-wrap ${commentIsActive ? 'value-set' : ''}`, children: _jsx(Textarea, { value: comment, maxLength: maxLength, onChange: (event) => {
                                        onChange && onChange(event.target);
                                    }, "aria-label": "Comment", "data-cy": isReply ? 'reply-form' : 'comments-form', placeholder: placeholder, rows: 2, sx: { padding: 2 }, onFocus: () => setTextareaIsFocussed(true), onBlur: () => setTextareaIsFocussed(false) }) }), _jsxs(Text, { sx: {
                                    fontSize: 1,
                                    display: commentIsActive ? 'flex' : 'none',
                                    alignSelf: 'flex-end',
                                    padding: 2,
                                }, children: [comment.length, "/", maxLength] })] }))] }), _jsx(Flex, { sx: {
                    alignSelf: 'flex-end',
                    height: ['40px', '52px'],
                    width: ['40px', 'auto'],
                }, children: _jsxs(Button, { "data-cy": isReply ? 'reply-submit' : 'comment-submit', "data-testid": "send-comment-button", disabled: !comment.trim() || !isLoggedIn || isLoading, variant: "primary", onClick: onClick, sx: {
                        height: ['40px', '100%'],
                        width: ['40px', 'auto'],
                        padding: [0, 1],
                    }, children: [isLoading && 'Loading...', !isLoading && (_jsxs(_Fragment, { children: [_jsx(Text, { sx: { display: ['none', 'block'] }, children: buttonLabel }), _jsx(Image, { src: sendMobile, sx: {
                                        display: ['block', 'none'],
                                        width: '22px',
                                        margin: 'auto',
                                    } })] }))] }) })] }));
};
const LoginPrompt = () => {
    return (_jsx(Box, { sx: { padding: [3, 4] }, children: _jsx(Text, { "data-cy": "comments-login-prompt", children: _jsx(ReturnPathLink, { to: "/sign-in", style: {
                    textDecoration: 'underline',
                    color: 'inherit',
                }, children: "Hi there! Login to leave a comment" }) }) }));
};
