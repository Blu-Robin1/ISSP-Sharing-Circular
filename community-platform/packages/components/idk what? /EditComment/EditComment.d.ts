export interface IProps {
    comment: string;
    handleCancel: () => void;
    handleSubmit: (commentText: string) => Promise<Response>;
    isReply: boolean;
    setShowEditModal: any;
}
export declare const EditComment: (props: IProps) => import("react/jsx-runtime").JSX.Element;
