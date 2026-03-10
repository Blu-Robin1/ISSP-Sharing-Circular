import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert } from 'theme-ui';
export default {
    title: 'Layout/Alert',
    component: Alert,
};
export const Success = () => (_jsx(Alert, { variant: "success", children: "A successful message" }));
export const Failure = () => (_jsx(Alert, { variant: "failure", children: "An error message" }));
export const Information = () => (_jsx(Alert, { variant: "info", children: "An information message" }));
export const FailureLong = () => (_jsxs(Alert, { variant: "failure", children: ["An error message: Veniam explicabo dolor ipsam impedit. Eum eos ut et consequatur eos eaque explicabo et inventore. Aperiam aut consequatur sit ut. Iusto consequatur enim placeat enim quia voluptas pariatur. Culpa quaerat placeat magni et autem earum placeat deserunt eum. A autem enim dolorum. Quo sint nisi vel. Voluptate voluptates alias repudiandae doloribus nemo. Quia aperiam nihil magnam quos ut id. Pariatur itaque sint. Id vel aliquid ullam delectus animi quis.", ' '] }));
