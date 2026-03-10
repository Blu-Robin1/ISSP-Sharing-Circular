import { jsx as _jsx } from "react/jsx-runtime";
import { CardButton } from './CardButton';
export default {
    title: 'Components/CardButton',
    component: CardButton,
};
export const Basic = () => (_jsx("div", { style: { width: '300px' }, children: _jsx(CardButton, { isSelected: false, children: _jsx("div", { style: { padding: '20px' }, children: "Basic Implementation" }) }) }));
