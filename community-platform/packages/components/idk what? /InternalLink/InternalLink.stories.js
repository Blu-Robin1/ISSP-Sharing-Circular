import { jsx as _jsx } from "react/jsx-runtime";
import { InternalLink } from './InternalLink';
export default {
    title: 'Components/InternalLink',
    component: InternalLink,
};
export const Default = () => (_jsx(InternalLink, { to: `/abc/`, children: "Link" }));
