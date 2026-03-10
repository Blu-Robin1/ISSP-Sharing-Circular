import type { OptionsOrGroups, Props as ReactSelectProps } from 'react-select';
type IOption = {
    label: string;
    value: string;
};
export interface Props extends ReactSelectProps {
    options: OptionsOrGroups<any, any>;
    value?: any;
    onChange?: (arg: any) => void;
    placeholder?: string;
    isMulti?: boolean;
    isClearable?: boolean;
    getOptionLabel?: any;
    getOptionValue?: any;
    defaultValue?: IOption;
    variant?: 'form' | 'formError' | 'icons' | 'tabs';
    useAlternateBackground?: boolean;
}
export declare const Select: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
