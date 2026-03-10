import type { MediaFile } from 'oa-shared';
export interface IProps {
    file: MediaFile;
    fileDownloadCount?: number;
    forDonationRequest?: boolean;
    isLoggedIn?: boolean;
    allowDownload?: boolean;
    handleClick?: () => void;
    redirectToSignIn?: () => Promise<void>;
}
export declare const DownloadStaticFile: (props: IProps) => import("react/jsx-runtime").JSX.Element | null;
