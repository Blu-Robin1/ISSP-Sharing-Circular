import { jsx as _jsx } from "react/jsx-runtime";
import { DownloadButton } from './DownloadButton';
export default {
    title: 'Components/DownloadButton',
    component: DownloadButton,
};
export const Default = () => _jsx(DownloadButton, { onClick: () => { } });
export const CustomDetails = () => (_jsx(DownloadButton, { onClick: () => { }, glyph: "download-cloud", label: "Hello there" }));
