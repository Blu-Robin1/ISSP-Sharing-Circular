import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Box } from 'theme-ui';
export const Modal = (props) => {
    const { children, width = 300, height, isOpen, sx, onDismiss } = props;
    const dialogRef = useRef(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        if (isOpen) {
            dialog.showModal();
        }
        else {
            dialog.close();
        }
    }, [isOpen]);
    const handleBackdropClick = (e) => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        // Only close if clicking the backdrop (::backdrop)
        const rect = dialog.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            onDismiss?.();
        }
    };
    const handleClose = () => {
        onDismiss?.();
    };
    if (!isOpen)
        return null;
    return (_jsx("dialog", { ref: dialogRef, onClick: handleBackdropClick, onClose: handleClose, style: {
            padding: 0,
            border: 'none',
            borderRadius: '10px',
            maxWidth: '90vw',
            maxHeight: '95vh',
            overflow: 'hidden',
        }, children: _jsx(Box, { sx: {
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: width,
                height: height,
                maxWidth: 'inherit',
                background: 'white',
                border: '2px solid black',
                borderRadius: '10px',
                overflow: 'auto',
                ...sx,
            }, children: children }) }));
};
