import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
export const Category = (props) => {
    const { category, sx } = props;
    return (_jsx(Flex, { sx: { alignItems: 'start' }, children: _jsx(Text, { "data-cy": "category", sx: {
                fontSize: 1,
                backgroundColor: 'lightGrey',
                paddingX: 2,
                paddingY: 1,
                borderRadius: 1,
                ...sx,
            }, children: category.name }) }));
};
