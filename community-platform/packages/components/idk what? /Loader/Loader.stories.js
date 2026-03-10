import { jsx as _jsx } from "react/jsx-runtime";
import { Loader } from './Loader';
export default {
    title: 'Layout/Loader',
    component: Loader,
};
export const Default = () => _jsx(Loader, {});
export const CustomMessage = () => (_jsx(Loader, { label: "Whatever you want to say! OMG!" }));
