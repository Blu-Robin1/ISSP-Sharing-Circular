import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from './Modal';
export default {
    title: 'Layout/Modal',
    component: Modal,
};
const dismissed = () => alert('Dismissed');
export const Default = () => (_jsx(Modal, { isOpen: true, onDismiss: dismissed, children: "Some Content" }));
export const Collapsed = () => (_jsx(Modal, { isOpen: false, onDismiss: () => { }, children: "Collapsed" }));
export const Sized = () => (_jsx(Modal, { isOpen: true, onDismiss: dismissed, height: 100, width: 100, children: "Sized Modal" }));
