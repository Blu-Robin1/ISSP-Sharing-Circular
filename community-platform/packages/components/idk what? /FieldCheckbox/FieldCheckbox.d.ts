import type { FieldRenderProps } from 'react-final-form';
type FieldProps = FieldRenderProps<boolean, any>;
export interface Props extends FieldProps {
    disabled?: boolean;
    'data-cy'?: string;
}
export declare const FieldCheckbox: ({ input, meta, disabled, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
