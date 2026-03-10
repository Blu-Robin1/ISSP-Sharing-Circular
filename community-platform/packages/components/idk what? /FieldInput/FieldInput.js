import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Box, Flex, Input, Text } from 'theme-ui';
import { CharacterCount } from '../CharacterCount/CharacterCount';
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const processInputModifiers = (value, modifiers = {}) => {
    if (typeof value !== 'string')
        return value;
    if (modifiers.trim) {
        value = value.trim();
    }
    if (modifiers.capitalize) {
        value = capitalizeFirstLetter(value);
    }
    return value;
};
export const FieldInput = ({ input, meta, disabled, modifiers, customOnBlur, showCharacterCount, minLength, maxLength, endAdornment, ...rest }) => {
    const curLength = useMemo(() => input?.value?.length ?? 0, [input?.value]);
    const InputElement = (_jsx(Input, { disabled: disabled, variant: meta?.error && meta?.touched ? 'textareaError' : 'textarea', ...input, ...rest, minLength: minLength, maxLength: maxLength, onBlur: (e) => {
            if (modifiers) {
                e.target.value = processInputModifiers(e.target.value, modifiers);
                input.onChange(e.target.value);
            }
            if (customOnBlur) {
                customOnBlur(e);
            }
            input.onBlur();
        }, onChange: (ev) => {
            input.onChange(ev.target.value);
        } }));
    return (_jsxs(Flex, { sx: { flexDirection: 'column', flex: 1, gap: 1 }, children: [meta.error && meta.touched && _jsx(Text, { sx: { fontSize: 1, color: 'error' }, children: meta.error }), endAdornment ? (_jsxs(Box, { style: {
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                }, children: [InputElement, _jsx(Box, { sx: {
                            position: 'absolute',
                            right: 2,
                        }, children: endAdornment })] })) : (InputElement), showCharacterCount && maxLength && (_jsx(CharacterCount, { currentSize: curLength, minSize: minLength, maxSize: maxLength }))] }));
};
