import { jsx as _jsx } from "react/jsx-runtime";
import HeaderHowtoIcon from '../../../../src/assets/images/header-section/howto-header-icon.svg';
import { ElWithBeforeIcon } from './ElWithBeforeIcon';
export default {
    title: 'Components/ElWithBeforeIcon',
    component: ElWithBeforeIcon,
};
export const Default = () => (_jsx(ElWithBeforeIcon, { icon: HeaderHowtoIcon, children: _jsx("p", { children: "Element" }) }));
export const Sizes = {
    render: (args) => (_jsx(ElWithBeforeIcon, { ...args, icon: HeaderHowtoIcon, children: _jsx("p", { children: "Element" }) })),
};
