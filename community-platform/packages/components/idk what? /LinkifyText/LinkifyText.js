import { jsx as _jsx } from "react/jsx-runtime";
import 'linkify-plugin-mention';
import styled from '@emotion/styled';
import Linkify from 'linkify-react';
import { useThemeUI } from 'theme-ui';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { InternalLink } from '../InternalLink/InternalLink';
export const LinkifyText = (props) => {
    const { theme } = useThemeUI();
    const StyledExternalLink = styled(ExternalLink) `
    color: ${theme.colors.grey}!important;
    text-decoration: underline;
  `;
    const StyledInternalLink = styled(InternalLink) `
    color: ${theme.colors.grey};
    font-weight: bold;
  `;
    const renderExternalLink = ({ attributes = {}, content = '' }) => {
        const { href, ...props } = attributes;
        return (_jsx(StyledExternalLink, { href: href, ...props, children: content }));
    };
    const renderInternalLink = ({ attributes = {}, content = '' }) => {
        const { href, ...props } = attributes;
        return (_jsx(StyledInternalLink, { to: `/u${href}`, ...props, children: content }));
    };
    return (_jsx(Linkify, { options: {
            render: {
                mention: renderInternalLink,
                url: renderExternalLink,
            },
        }, children: props.children }));
};
