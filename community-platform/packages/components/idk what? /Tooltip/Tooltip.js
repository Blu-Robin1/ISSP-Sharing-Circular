import { jsx as _jsx } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { Tooltip as ReactTooltip } from 'react-tooltip';
const StyledTooltip = styled(ReactTooltip) `
  z-index: 9999 !important;
  text-align: center;
  border-radius: 5px !important;
  padding: 5px 10px !important;
`;
export const Tooltip = ({ children, id }) => {
    return (_jsx(StyledTooltip, { id: id, openEvents: { mouseenter: true, focus: true }, closeEvents: { mouseleave: true, blur: true }, children: children }));
};
