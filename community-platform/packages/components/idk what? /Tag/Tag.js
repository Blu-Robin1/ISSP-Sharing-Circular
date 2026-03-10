import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'theme-ui';
export const Tag = ({ tag, sx }) => {
    if (!tag || !tag.label)
        return null;
    return (_jsx(Text, { sx: {
            fontSize: 1,
            color: 'blue',
            ...sx,
            '::before': {
                content: '"#"',
            },
        }, children: tag.label }));
};
