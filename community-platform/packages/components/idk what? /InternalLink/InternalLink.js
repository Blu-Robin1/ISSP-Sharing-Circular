import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link } from 'theme-ui';
export const InternalLink = forwardRef((props, ref) => (_jsx(Link, { as: RouterLink, ref: ref, ...props, children: props.children })));
InternalLink.displayName = 'InternalLink';
