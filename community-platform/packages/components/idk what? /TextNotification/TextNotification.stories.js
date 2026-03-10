import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { TextNotification } from './TextNotification';
export default {
    title: 'Layout/TextNotification',
    component: TextNotification,
};
export const Success = () => (_jsx(TextNotification, { variant: "success", isVisible: true, children: "A short snappy notification" }));
export const SuccessDismissable = () => {
    const [visible, setVisibility] = useState(true);
    return (_jsx(TextNotification, { variant: "success", isVisible: visible, onDismiss: setVisibility, children: "A short snappy notification" }));
};
export const Error = () => (_jsx(TextNotification, { variant: "failure", isVisible: true, children: "A short snappy notification" }));
