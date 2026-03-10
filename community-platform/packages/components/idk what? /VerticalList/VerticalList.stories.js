import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from 'theme-ui';
import { VerticalList } from './VerticalList.client';
export default {
    title: 'Components/VerticalList',
    component: VerticalList,
};
export const Default = () => {
    const items = ['hello', 'world!', '...', 'Yeah,', 'you!'];
    return (_jsx("div", { style: { width: '500px' }, children: _jsx(VerticalList, { children: items.map((item, index) => (_jsx(Box, { sx: {
                    width: '200px',
                    height: '200px',
                    border: '2px solid #000',
                }, children: item }, index))) }) }));
};
