import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmModal } from './ConfirmModal';
export default {
    title: 'Layout/ConfirmModal',
    component: ConfirmModal,
};
export const Default = () => (_jsx(ConfirmModal, { message: "Are you sure you want to delete this item?", confirmButtonText: "Delete", isOpen: true, handleCancel: () => null, handleConfirm: () => null }));
