import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex } from 'theme-ui';
import { glyphs, Icon } from './Icon';
export default {
    title: 'Components/Icon',
    component: Icon,
};
export const Default = () => _jsx(Icon, { glyph: "delete" });
export const Sizes = () => (_jsx(_Fragment, { children: ['xl', 'lg', 'md', 'sm', 'xs'].map((size, key) => (_jsx(Icon, { glyph: "delete", size: size }, key))) }));
export const Available = () => (_jsx(Flex, { sx: { flexWrap: 'wrap', gap: 2 }, children: Object.keys(glyphs).map((glyph, key) => (_jsx("a", { title: glyph, children: _jsx(Icon, { glyph: glyph, size: 30 }) }, key))) }));
export const Colours = () => (_jsx(_Fragment, { children: ['#37ecba', '#47d5b9', '#57c1c5', '#72afd3'].map((color, key) => (_jsx(Icon, { glyph: "delete", color: color, size: 'lg' }, key))) }));
