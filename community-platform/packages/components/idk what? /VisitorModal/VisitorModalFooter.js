import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { commonStyles } from 'oa-themes';
import { Flex } from 'theme-ui';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
const ContactSpaceButton = ({ hide }) => (_jsx(Button, { sx: { margin: 1, width: '100%', justifyContent: 'center' }, onClick: () => hide('contact'), children: _jsxs(Flex, { sx: { gap: 1, alignItems: 'center' }, children: [_jsx(Icon, { glyph: "contact" }), "Contact the space"] }) }));
export const VisitorModalFooter = ({ hide }) => (_jsx(Flex, { sx: {
        padding: 2,
        borderTop: '1px solid',
        borderColor: commonStyles.colors.darkGrey,
    }, children: _jsx(ContactSpaceButton, { hide: hide }) }));
