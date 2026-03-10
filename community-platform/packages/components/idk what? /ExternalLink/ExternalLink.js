import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'theme-ui';
/**
 * Provides a styled `a` tag. Opens in new tab with noopener and noreferrer rel attributes
 *
 * https://pointjupiter.com/what-noopener-noreferrer-nofollow-explained/
 */
export const ExternalLink = (props) => {
    return (_jsx(Link, { ...props, sx: {
            ':hover': {
                textDecoration: 'underline',
            },
        }, target: "_blank", rel: "noopener noreferrer" }));
};
