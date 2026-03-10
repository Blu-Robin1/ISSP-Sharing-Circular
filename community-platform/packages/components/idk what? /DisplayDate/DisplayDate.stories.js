import { jsx as _jsx } from "react/jsx-runtime";
import { subMonths } from 'date-fns';
import { DisplayDate } from './DisplayDate';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/DisplayDate',
    component: DisplayDate,
};
export const Default = () => {
    return _jsx(DisplayDate, { createdAt: new Date() });
};
export const TwoMonthsAGo = () => {
    const twoMonthsAGo = subMonths(new Date(), 2);
    return _jsx(DisplayDate, { createdAt: twoMonthsAGo });
};
