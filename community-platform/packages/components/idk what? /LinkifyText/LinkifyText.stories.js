import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinkifyText } from './LinkifyText';
export default {
    title: 'Components/LinkifyText',
    component: LinkifyText,
};
export const Default = () => (_jsx(LinkifyText, { children: "There are some link.info hidden in this text. https://example.com if you can spot all of them." }));
export const SupportsMentions = () => (_jsxs(LinkifyText, { children: ["In addition to a URLs, it is also possible to @mention somone. Although there are edge cases where using @\u2060a-mention should ", _jsx("b", { children: "not" }), " be a link."] }));
