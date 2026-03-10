import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Select } from './Select';
export default {
    title: 'Forms/Select',
    component: Select,
};
export const Default = () => {
    return (_jsx(Select, { placeholder: "A placeholder value", options: [
            {
                value: 'value-one',
                label: 'Value 1',
            },
            {
                value: 'value-two',
                label: 'Value 2',
            },
        ] }));
};
export const Clearable = () => {
    const [value, setValue] = useState();
    return (_jsx(Select, { value: value, onChange: setValue, placeholder: "A placeholder value", isClearable: true, options: [
            {
                value: 'value-one',
                label: 'Value 1',
            },
            {
                value: 'value-two',
                label: 'Value 2',
            },
        ] }));
};
export const MultipleSelect = () => {
    const [value, setValue] = useState({
        value: 'value-three',
        label: 'Value 3',
    });
    return (_jsx(Select, { value: value, onChange: setValue, isMulti: true, placeholder: "A placeholder value", options: [
            {
                value: 'value-one',
                label: 'Value 1',
            },
            {
                value: 'value-two',
                label: 'Value 2',
            },
            {
                value: 'value-three',
                label: 'Value 3',
            },
        ] }));
};
export const FormSelect = () => {
    const [value, setValue] = useState();
    return (_jsx(Select, { value: value, onChange: setValue, isMulti: true, placeholder: "A placeholder value", options: [
            {
                value: 'value-one',
                label: 'Value 1',
            },
            {
                value: 'value-two',
                label: 'Value 2',
            },
        ] }));
};
export const SelectWithIcons = () => {
    const [value, setValue] = useState();
    return (_jsx(Select, { variant: "icons", value: value, onChange: setValue, isMulti: true, placeholder: "A placeholder value", options: [
            {
                label: '',
                options: [
                    {
                        imageElement: '',
                        value: 'verified',
                        label: 'Verified',
                    },
                ],
            },
            {
                label: 'All Workspaces',
                options: [
                    {
                        imageElement: '',
                        value: 'verified',
                        label: 'Verified',
                    },
                ],
            },
            {
                label: 'Others',
                options: [
                    {
                        imageElement: '',
                        value: 'verified',
                        label: 'Verified',
                    },
                ],
            },
        ] }));
};
