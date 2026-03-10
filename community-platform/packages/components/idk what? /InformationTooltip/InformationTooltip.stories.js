import { jsx as _jsx } from "react/jsx-runtime";
import { InformationTooltip } from './InformationTooltip';
export default {
    title: 'Components/Information',
    component: InformationTooltip,
};
export const Default = () => (_jsx(InformationTooltip, { glyph: "information", tooltip: "Just a little wrapper for an icon/tooltip", size: 30 }));
