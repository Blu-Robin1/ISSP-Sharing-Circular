import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex, Image, Text, useThemeUI } from 'theme-ui';
const rotate = keyframes `
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const RotatingLogo = styled(Image) `
  animation: ${rotate} 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  padding: 1rem;
`;
export const Loader = ({ label, sx }) => {
    const themeUi = useThemeUI();
    const theme = themeUi.theme;
    const logo = theme.logo || null;
    return (_jsxs(Flex, { sx: { flexWrap: 'wrap', justifyContent: 'center', ...sx }, children: [logo && (_jsx(RotatingLogo, { loading: "lazy", "data-cy": "loader", "data-testid": "loader", src: logo, sx: { width: [75, 75, 100] } })), _jsx(Text, { sx: { width: '100%', textAlign: 'center' }, children: label || 'Loading...' })] }));
};
