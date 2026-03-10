import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Input } from 'theme-ui';
import { Icon } from '../Icon/Icon';
export const SearchField = (props) => {
    const { autoComplete = 'on', name = 'rand-name', id = 'rand-id', dataCy, placeHolder, value, onChange, onClickDelete, onClickSearch, additionalStyle = {}, } = props;
    return (_jsxs(Box, { sx: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        }, children: [_jsx(Input, { autoComplete: autoComplete, name: name, id: id, variant: "inputOutline", type: "search", "data-cy": dataCy, placeholder: placeHolder, value: value, onChange: (e) => onChange(e.target.value), sx: {
                    paddingRight: 11,
                    '::-webkit-search-cancel-button': {
                        display: 'none',
                    },
                    '::-ms-clear': {
                        display: 'none',
                    },
                    ...additionalStyle,
                } }), _jsxs(Box, { sx: {
                    right: 2,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                }, children: [value && (_jsx(Icon, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: 1,
                        }, glyph: "close", onClick: onClickDelete, size: "17" })), _jsx(Icon, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                        }, glyph: "search", onClick: onClickSearch, size: "19" })] })] }));
};
