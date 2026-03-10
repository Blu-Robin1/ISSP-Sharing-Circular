import { jsx as _jsx } from "react/jsx-runtime";
import { components } from 'react-select';
import { Image } from 'theme-ui';
import IconArrowDown from '../../assets/icons/icon-arrow-down.svg';
// https://github.com/JedWatson/react-select/issues/685#issuecomment-420213835
export const DropdownIndicator = (props) => {
    return (_jsx(components.DropdownIndicator, { ...props, children: _jsx(Image, { loading: "lazy", src: IconArrowDown, style: { width: 12 } }) }));
};
