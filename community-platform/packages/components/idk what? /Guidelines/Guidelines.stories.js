import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Guidelines } from './Guidelines';
export default {
    title: 'Forms/Guidelines',
    component: Guidelines,
};
export const DefaultComponent = () => (_jsx(Guidelines, { title: "How does it work?", steps: [
        _jsxs(_Fragment, { children: ["Choose a topic you want to research", ' ', _jsx("span", { role: "img", "aria-label": "raised-hand", children: "\uD83D\uDE4C" })] }),
        _jsxs(_Fragment, { children: ["Read", ' ', _jsxs(ExternalLink, { sx: { color: 'blue' }, href: "/academy/guides/research", children: ["our guidelines", ' ', _jsx("span", { role: "img", "aria-label": "nerd-face", children: "\uD83E\uDD13" })] })] }),
        _jsxs(_Fragment, { children: ["Write your introduction", ' ', _jsx("span", { role: "img", "aria-label": "archive-box", children: "\uD83D\uDDC4\uFE0F" })] }),
    ] }));
export const Default = () => _jsx(DefaultComponent, {});
