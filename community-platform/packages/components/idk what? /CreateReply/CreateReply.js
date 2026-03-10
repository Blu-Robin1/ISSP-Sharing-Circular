import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Alert, Box } from 'theme-ui';
import { CreateComment } from '../CreateComment/CreateComment';
export const CreateReply = (props) => {
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { commentId, isLoggedIn, maxLength, onSubmit } = props;
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await onSubmit(commentId, reply);
            setReply('');
            setIsLoading(false);
        }
        catch (_) {
            // Swallow the error for now
            setIsLoading(false);
            setIsError(true);
        }
    };
    return (_jsxs(Box, { sx: {
            background: 'softblue',
            borderRadius: 2,
            marginBottom: 3,
            padding: 3,
        }, children: [_jsx(CreateComment, { maxLength: maxLength, comment: reply, onChange: (text) => setReply(text), onSubmit: handleSubmit, isLoggedIn: isLoggedIn, isLoading: isLoading, isReply: true, buttonLabel: "Leave a reply" }), isError ? (_jsx(Alert, { variant: "failure", sx: { mt: 3 }, children: "Unable to leave a comment at this time. Please try again later." })) : null] }));
};
