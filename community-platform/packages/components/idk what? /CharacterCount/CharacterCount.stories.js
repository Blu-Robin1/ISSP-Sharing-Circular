import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { CharacterCount } from './CharacterCount';
export default {
    title: 'Components/CharacterCount',
    component: CharacterCount,
};
const errorValues = [
    {
        currentSize: 10,
        minSize: 50,
        maxSize: 200,
    },
    {
        currentSize: 200,
        minSize: 0,
        maxSize: 100,
    },
];
export const Default = () => (_jsx(CharacterCount, { currentSize: 0, minSize: 0, maxSize: 100 }));
export const WithValidState = () => (_jsx(CharacterCount, { currentSize: 50, minSize: 0, maxSize: 100 }));
export const WithError = () => (_jsx(_Fragment, { children: errorValues.map((state, index) => {
        return (_jsx(CharacterCount, { currentSize: state.currentSize, minSize: state.minSize, maxSize: state.maxSize }, index));
    }) }));
