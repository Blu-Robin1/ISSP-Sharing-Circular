import { Select } from 'oa-components';
import * as React from 'react';
import { Flex, Text } from 'theme-ui';

import { FieldContainer } from './FieldContainer';

import type { FieldProps } from './types';

interface ISelectOption {
  value: string;
  label: string;
}
interface ISelectFieldProps extends FieldProps {
  options?: ISelectOption[];
  placeholder?: string;
  style?: React.CSSProperties;
  onCustomChange?: (value) => void;
  showError?: boolean;
}

const getValueFromSelect = (
  v: ISelectOption | ISelectOption[] | string | string[] | null | undefined,
) => {
  if (!v) return v;

  if (Array.isArray(v)) {
    return v.map((el) => (typeof el === 'string' ? el : el.value));
  }

  return typeof v === 'string' ? v : v.value;
};

const getValueForSelect = (opts: ISelectOption[] = [], v: string | string[] | null | undefined) => {
  const findVal = (optVal: string) => opts.find((o) => o.value === optVal);
  return v
    ? Array.isArray(v)
      ? v.map((optVal) => findVal(optVal) as ISelectOption)
      : findVal(v)
    : null;
};

const defaultProps: Partial<ISelectFieldProps> = {
  getOptionLabel: (option: ISelectOption) => option.label,
  getOptionValue: (option: ISelectOption) => option.value,
  options: [],
};

export const SelectField = ({
  input,
  meta,
  onCustomChange,
  showError = true,
  ...rest
}: ISelectFieldProps) => (
  <Flex sx={{ padding: 0, flexDirection: 'column' }}>
    {showError && meta.error && meta.touched && (
      <Text sx={{ fontSize: 1, color: 'error' }}>{meta.error}</Text>
    )}

    <FieldContainer
      invalid={meta.error && meta.touched}
      style={rest.style}
      data-cy={rest['data-cy']}
    >
      <Select
        suppressHydrationWarning
        onChange={(v) => {
          const value = getValueFromSelect(v);
          input.onChange(value);
          if (onCustomChange) {
            onCustomChange(value);
          }
        }}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={getValueForSelect(rest.options, input.value)}
        variant={meta?.error && meta?.touched ? 'formError' : 'form'}
        {...defaultProps}
        {...(rest as any)}
      />
    </FieldContainer>
  </Flex>
);
