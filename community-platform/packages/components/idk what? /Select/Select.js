import { jsx as _jsx } from "react/jsx-runtime";
import ReactSelect from 'react-select';
import { useThemeUI } from 'theme-ui';
import { DropdownIndicator } from './DropdownIndicator';
import { Option } from './Option';
export const Select = (props) => {
    const { theme } = useThemeUI();
    const SelectStyles = {
        container: (provided) => ({
            ...provided,
            fontSize: theme.fontSizes[2] + 'px',
            fontFamily: '"Varela Round", Arial, sans-serif',
        }),
        control: (provided) => ({
            ...provided,
            border: '1px solid ' + theme.colors.softblue,
            backgroundColor: theme.colors.background,
            minHeight: '40px',
            cursor: 'pointer',
            boxShadow: 'none',
            ':focus': {
                border: '1px solid ' + theme.colors.blue,
                outline: 'none',
            },
            ':hover': {
                border: '1px solid ' + theme.colors.blue,
            },
        }),
        option: (provided, { data, isFocused, isDisabled }) => ({
            ...provided,
            backgroundColor: isFocused ? theme.colors.white : theme.colors.background,
            boxShadow: 'none',
            cursor: 'pointer',
            color: !isDisabled ? data.color || theme.colors.black : theme.colors.lightgrey,
        }),
        menu: (provided) => ({
            ...provided,
            border: '1px solid ' + theme.colors.softblue,
            boxShadow: 'none',
            backgroundColor: theme.colors.background,
            ':hover': {
                border: '1px solid ' + theme.colors.softblue,
            },
        }),
        multiValue: (provided, { data }) => ({
            ...provided,
            borderRadius: data.color ? 99 : 4,
            backgroundColor: data.color ? `${data.color}20` : theme.colors.white,
            padding: '2px',
            border: '1px solid ',
            borderColor: data.color || theme.colors.softgrey,
            color: data.color || theme.colors.grey,
        }),
        multiValueLabel: (provided, { data }) => ({
            ...provided,
            color: data.color || theme.colors.grey,
        }),
        multiValueRemove: (provided, { data }) => ({
            ...provided,
            borderRadius: data.color ? 99 : 4,
            color: data.color || theme.colors.grey,
            ':hover': {
                backgroundColor: data.color || theme.colors.grey,
                color: 'white',
            },
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            ':hover': {
                opacity: state.isFocused ? 1 : 0.5,
            },
            opacity: state.isFocused ? 1 : 0.3,
        }),
    };
    const SelectStylesError = {
        ...SelectStyles,
        control: (provided) => ({
            ...provided,
            border: '1px solid ' + theme.colors.red,
            ':focus': {
                border: '1px solid ' + theme.colors.red,
            },
            ':hover': {
                border: '1px solid ' + theme.colors.red,
            },
        }),
        menu: (provided) => ({
            ...provided,
            border: '1px solid ' + theme.colors.red,
            ':hover': {
                border: '1px solid ' + theme.colors.red,
            },
        }),
    };
    const FilterStyles = {
        container: (provided) => ({
            ...provided,
            fontSize: theme.fontSizes[2] + 'px',
            fontFamily: '"Varela Round", Arial, sans-serif',
            border: '2px solid ' + theme.colors.black,
            borderRadius: '5px',
            color: theme.colors.black,
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: props.useAlternateBackground ? theme.colors.softblue : theme.colors.white,
            minHeight: '40px',
            cursor: 'pointer',
            boxShadow: 'none',
            ':hover': {
                border: '1px solid ' + theme.colors.blue,
            },
            ':focus': {
                border: '1px solid ' + theme.colors.blue,
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme.colors.black,
        }),
        option: (provided, state) => ({
            ...provided,
            color: theme.colors.black,
            backgroundColor: state.isFocused ? theme.colors.softblue : theme.colors.white,
            cursor: 'pointer',
            boxShadow: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            border: '2px solid ' + theme.colors.black,
            boxShadow: 'none',
            backgroundColor: theme.colors.white,
            zIndex: 3,
            ':hover': {
                border: '2px solid ' + theme.colors.black,
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: theme.colors.softblue,
            padding: '2px',
            border: '1px solid ' + theme.colors.black,
            color: theme.colors.grey,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        valueContainer: (base) => ({
            ...base,
            flexWrap: 'nowrap',
            overflow: 'auto',
        }),
    };
    const options = props.options || [];
    const styleVariant = {
        default: FilterStyles,
        form: SelectStyles,
        formError: SelectStylesError,
        icons: FilterStyles,
        tabs: FilterStyles,
    };
    return (_jsx(ReactSelect, { classNamePrefix: 'data-cy', components: { DropdownIndicator, Option }, defaultValue: props.defaultValue, getOptionLabel: props.getOptionLabel && props.getOptionLabel, getOptionValue: props.getOptionValue && props.getOptionValue, isClearable: !!props.isClearable, isMulti: !!props.isMulti, placeholder: props.placeholder, styles: styleVariant[props.variant || 'default'], options: options, onChange: (v) => props.onChange && props.onChange(v), value: props.value, onInputChange: props.onInputChange, isOptionDisabled: props.isOptionDisabled, noOptionsMessage: props.noOptionsMessage }));
};
