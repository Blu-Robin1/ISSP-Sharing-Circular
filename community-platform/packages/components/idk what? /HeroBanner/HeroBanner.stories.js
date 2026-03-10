import { jsx as _jsx } from "react/jsx-runtime";
import { HeroBanner } from './HeroBanner';
export default {
    title: 'Layout/HeroBanner',
    component: HeroBanner,
};
export const Celebration = () => _jsx(HeroBanner, { type: "celebration" });
export const Email = () => _jsx(HeroBanner, { type: "email" });
