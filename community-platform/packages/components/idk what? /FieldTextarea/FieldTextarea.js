import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Flex, Text, Textarea } from 'theme-ui';
import { CharacterCount } from '../CharacterCount/CharacterCount';
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const processInputModifiers = (value, modifiers) => {
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
export const FieldTextarea = ({ input, meta, disabled, modifiers, customOnBlur, minLength = 0, maxLength, showCharacterCount, rows, ...rest }) => {
    const curLength = useMemo(() => input?.value?.length ?? 0, [input?.value]);
    return (_jsxs(Flex, { sx: { flexDirection: 'column', gap: 1 }, children: [meta.error && meta.touched && _jsx(Text, { sx: { fontSize: 1, color: 'error' }, children: meta.error }), _jsx(Textarea, { disabled: disabled, minLength: minLength, maxLength: maxLength, variant: meta?.error && meta?.touched ? 'textareaError' : 'textarea', rows: rows ? rows : 5, sx: {
                    resize: rest?.style?.resize ? rest.style.resize : 'vertical',
                }, ...input, ...rest, onBlur: (e) => {
                    if (modifiers) {
                        e.target.value = processInputModifiers(e.target.value, modifiers);
                        input.onChange(e.target.value);
                    }
                    if (customOnBlur) {
                        customOnBlur(e);
                    }
                    input.onBlur();
                }, onChange: (ev) => input.onChange(ev.target.value) }), showCharacterCount && maxLength && (_jsx(CharacterCount, { minSize: minLength, maxSize: maxLength, currentSize: curLength }))] }));
};
