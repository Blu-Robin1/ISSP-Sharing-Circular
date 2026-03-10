import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { Flex, Text } from 'theme-ui';
const StyledCheckbox = styled.input `
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const FieldCheckbox = ({ input, meta, disabled, ...rest }) => {
    const { value, type, ...inputProps } = input;
    return (_jsxs(Flex, { sx: { flexDirection: 'column', gap: 1 }, children: [meta.error && meta.touched && _jsx(Text, { sx: { fontSize: 1, color: 'error' }, children: meta.error }), _jsx(StyledCheckbox, { ...inputProps, ...rest, type: "checkbox", disabled: disabled, checked: !!value })] }));
};
