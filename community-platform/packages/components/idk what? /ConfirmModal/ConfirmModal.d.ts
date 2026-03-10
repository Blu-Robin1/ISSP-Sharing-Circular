export interface Props {
    message: string;
    confirmButtonText: string;
    isOpen: boolean;
    handleCancel: () => void;
    handleConfirm: () => void;
    width?: number;
    cancelVariant?: 'outline' | 'destructive' | 'primary';
    confirmVariant?: 'outline' | 'destructive' | 'primary';
}
export declare const ConfirmModal: (props: Props) => import("react/jsx-runtime").JSX.Element;
