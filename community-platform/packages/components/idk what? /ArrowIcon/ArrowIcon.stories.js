import { jsx as _jsx } from "react/jsx-runtime";
import { Arrow } from './ArrowIcon';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/Arrow icon',
    component: Arrow,
};
export const Left = () => _jsx(Arrow, { direction: "left" });
export const Right = () => _jsx(Arrow, { direction: "right" });
