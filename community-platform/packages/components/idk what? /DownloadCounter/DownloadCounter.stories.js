import { jsx as _jsx } from "react/jsx-runtime";
import { DownloadCounter } from './DownloadCounter';
export default {
    title: 'Components/DownloadCounter',
    component: DownloadCounter,
};
export const Default = () => _jsx(DownloadCounter, { total: 1888999 });
export const One = () => _jsx(DownloadCounter, { total: 1 });
export const Zero = () => _jsx(DownloadCounter, { total: undefined });
