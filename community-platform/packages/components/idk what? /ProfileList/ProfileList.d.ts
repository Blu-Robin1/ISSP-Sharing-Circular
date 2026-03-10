import type { ProfileListItem } from 'oa-shared';
interface IProps {
    profiles: ProfileListItem[];
    onClose?: () => void;
    children?: React.ReactNode;
    header: string;
}
export declare const ProfileList: ({ profiles, onClose, header }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
