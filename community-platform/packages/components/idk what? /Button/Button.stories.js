import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { glyphs } from '../Icon/Icon';
import { Button } from './Button';
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/Button',
    component: Button,
};
const sizeOptions = [
    {
        small: true,
        label: 'Small',
    },
    {
        label: 'Default',
    },
    {
        large: true,
        label: 'Large',
    },
];
export const Basic = () => _jsx(Button, { children: "Button Text" });
export const Disabled = () => (_jsxs(_Fragment, { children: [_jsx(Button, { disabled: true, children: "Disabled" }), _jsx(Button, { icon: "delete", disabled: true, children: "Disabled" })] }));
export const Primary = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: 'primary', children: "Primary" }), _jsx(Button, { icon: "delete", variant: 'primary', children: "Primary" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: 'primary', ...v, children: v.label }, k)))] }));
export const Secondary = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: 'secondary', children: "Secondary" }), _jsx(Button, { icon: "delete", variant: 'secondary', children: "Secondary" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: 'secondary', ...v, children: v.label }, k)))] }));
export const Destructive = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: 'destructive', children: "Destructive" }), _jsx(Button, { icon: "delete", variant: 'destructive', children: "Destructive" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: 'destructive', ...v, children: v.label }, k)))] }));
export const Success = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "success", children: "Success" }), _jsx(Button, { icon: "delete", variant: "success", children: "Success" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: "success", ...v, children: v.label }, k)))] }));
export const Subtle = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: 'subtle', children: "Subtle" }), _jsx(Button, { variant: 'subtle', icon: "account-circle", children: "Subtle" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: 'subtle', ...v, children: v.label }, k)))] }));
export const Outline = () => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: 'outline', children: "Outline" }), _jsx(Button, { variant: 'outline', icon: "account-circle", children: "Outline" }), sizeOptions.map((v, k) => (_jsx(Button, { variant: 'outline', ...v, children: v.label }, k)))] }));
export const Small = () => (_jsxs(_Fragment, { children: [_jsx(Button, { small: true, children: "Small Button" }), _jsx(Button, { small: true, icon: "delete", children: "Small Button with Icon" })] }));
export const Large = () => (_jsxs(_Fragment, { children: [_jsx(Button, { large: true, children: "Large Button" }), _jsx(Button, { large: true, icon: "delete", children: "Large Button with Icon" })] }));
export const IconOnly = () => (_jsx(_Fragment, { children: _jsx(Button, { large: true, icon: "delete", showIconOnly: true, children: "Icon Button with hidden text" }) }));
export const Icons = () => (_jsx(_Fragment, { children: sizeOptions.map((size) => ['primary', 'secondary', 'outline'].map((variant) => Object.keys(glyphs).map((glyph, key) => (_jsxs(Button, { icon: glyph, ...size, variant: variant, children: [size.label, " with Icon"] }, key))))) }));
