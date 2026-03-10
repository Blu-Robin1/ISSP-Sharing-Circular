import { jsx as _jsx } from "react/jsx-runtime";
import { Alert } from 'theme-ui';
export const Banner = (props) => {
    const { children, onClick, sx, variant } = props;
    return (_jsx(Alert, { "data-cy": "Banner", onClick: onClick, variant: variant || 'failure', sx: {
            borderRadius: 2,
            alignItems: 'center',
            flex: '1',
            justifyContent: 'center',
            cursor: onClick ? 'pointer' : 'default',
            fontSize: 2,
            ':hover': { textDecoration: onClick ? 'underline' : 'none' },
            ...sx,
        }, children: children }));
};
