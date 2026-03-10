import { jsx as _jsx } from "react/jsx-runtime";
import { DownloadStaticFile } from './DownloadStaticFile';
export default {
    title: 'Components/DownloadStaticFile',
    component: DownloadStaticFile,
};
export const Default = () => (_jsx(DownloadStaticFile, { file: {
        name: 'example',
        size: 1200000,
        url: 'https://example.com',
        id: '',
    }, fileDownloadCount: 346 }));
export const LoggedOut = () => (_jsx(DownloadStaticFile, { file: {
        name: 'example',
        size: 1200000,
        url: 'https://example.com',
        id: '',
    }, redirectToSignIn: async () => {
        alert('Redirect to Sign In');
    }, fileDownloadCount: 6 }));
