import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { components } from 'react-select';
import { Flex, Text } from 'theme-ui';
// https://github.com/JedWatson/react-select/issues/685#issuecomment-420213835
export const Option = (props) => {
    const option = props.data;
    if (option.imageElement) {
        return (_jsx(components.Option, { ...props, children: _jsx(_Fragment, { children: _jsx(Flex, { sx: { alignItems: 'center', justifyContent: 'space-between' }, mt: "5px", children: _jsxs(Flex, { sx: { alignItems: 'center' }, children: [option.imageElement, _jsxs(Text, { sx: { fontSize: 2 }, ml: "10px", children: [option.label, option.number && ` (${option.number})`] })] }) }, option.label) }) }));
    }
    return _jsx(components.Option, { ...props, children: props.label });
};
