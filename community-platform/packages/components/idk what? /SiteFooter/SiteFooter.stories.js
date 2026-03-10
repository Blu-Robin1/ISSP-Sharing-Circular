import { jsx as _jsx } from "react/jsx-runtime";
import { SiteFooter } from './SiteFooter';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Layout/SiteFooter',
    component: SiteFooter,
};
export const Default = () => _jsx(SiteFooter, { siteName: "British Columbia Institute of Technology" });
