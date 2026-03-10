import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { commonStyles } from 'oa-themes';
import { Flex } from 'theme-ui';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
export const VisitorModalHeader = ({ hide, data }) => (_jsxs(Flex, { sx: {
        borderBottom: '1px solid',
        borderColor: commonStyles.colors.darkGrey,
        gap: 2,
        justifyContent: 'space-between',
        padding: 0,
        alignItems: 'anchor-center',
        paddingLeft: 2,
    }, children: [_jsxs(Flex, { sx: { alignItems: 'center', columnGap: 1 }, children: [data.icon, data.label] }), _jsx(ButtonIcon, { "data-testid": "VisitorModal-CloseButton", icon: "close", onClick: () => hide(), sx: { border: 'none', paddingLeft: 2, paddingRight: 3 } })] }));
