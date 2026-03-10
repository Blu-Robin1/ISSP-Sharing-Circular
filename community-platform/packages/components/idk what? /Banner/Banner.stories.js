import { jsx as _jsx } from "react/jsx-runtime";
import { Banner } from './Banner';
export default {
    title: 'Layout/Banner',
    component: Banner,
};
export const Default = () => (_jsx(Banner, { children: "Defaults to a failure banner when no varient defined" }));
export const AccentWithOnclick = () => (_jsx(Banner, { variant: "accent", onClick: () => null, children: "This is an accent with onClick" }));
export const InfoWithCustomStylings = () => (_jsx(Banner, { variant: "info", sx: { height: '200px', border: '4px solid #333' }, children: "Info with custom stylings" }));
export const Success = () => (_jsx(Banner, { variant: "success", onClick: () => null, children: "Success Banner" }));
