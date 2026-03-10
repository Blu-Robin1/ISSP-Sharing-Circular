export interface IProps {
    description?: string;
    imageUrl?: string;
    iframeSrc?: string;
    spaceName?: string;
    isOpen: boolean;
    onDidDismiss: () => void;
    children?: React.ReactNode | React.ReactNode[];
}
export declare const DonationRequestModal: (props: IProps) => import("react/jsx-runtime").JSX.Element;
