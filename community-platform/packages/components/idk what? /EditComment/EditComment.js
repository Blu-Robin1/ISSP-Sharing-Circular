import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Flex, Label } from 'theme-ui';
import { object, string } from 'yup';
import { Banner } from '../Banner/Banner';
import { Button } from '../Button/Button';
import { FieldTextarea } from '../FieldTextarea/FieldTextarea';
export const EditComment = (props) => {
    const { comment, isReply, setShowEditModal } = props;
    const [error, setError] = useState(undefined);
    const validationSchema = object({
        comment: string().required('Make sure this field is filled correctly'),
    });
    const required = (value) => (value?.trim() ? undefined : 'Comment cannot be blank');
    const handleFormSubmit = async (comment) => {
        if (!comment?.trim()) {
            return;
        }
        const response = await props.handleSubmit(comment);
        if (response.ok) {
            setShowEditModal(false);
        }
        else {
            setError(response.statusText);
        }
    };
    const validateEditedComment = async (values) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
        }
        catch (err) {
            return err.inner.reduce((acc, error) => ({
                ...acc,
                [error.path]: error.message,
            }), {});
        }
    };
    return (_jsx(Form, { onSubmit: () => {
            // do nothing
        }, initialValues: {
            comment,
        }, validate: validateEditedComment, "data-cy": "EditCommentForm", render: ({ invalid, handleSubmit, values }) => {
            const disabled = invalid;
            return (_jsxs(Flex, { as: "form", sx: {
                    flexDirection: 'column',
                    padding: 2,
                    gap: 2,
                }, onSubmit: handleSubmit, children: [_jsxs(Label, { as: "label", htmlFor: "comment", sx: { marginBottom: '6px', fontSize: 3 }, children: ["Edit ", isReply ? 'Reply' : 'Comment'] }), error && _jsx(Banner, { variant: "failure", children: error }), _jsx(Field, { component: FieldTextarea, "data-cy": "edit-comment", id: "comment", validate: required, name: "comment", rows: 2, sx: { padding: 1 } }), _jsxs(Flex, { mt: 4, ml: "auto", children: [_jsx(Button, { type: "button", small: true, mr: 4, variant: "outline", onClick: () => props?.handleCancel(), children: "Cancel" }), _jsx(Button, { "data-cy": "edit-comment-submit", "data-testid": "edit-comment-submit", type: "submit", "aria-label": "Save changes", small: true, disabled: disabled, onClick: () => {
                                    handleFormSubmit(values.comment);
                                }, children: "Save" })] })] }));
        } }));
};
