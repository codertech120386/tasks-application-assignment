import { Select } from '@mantine/core';
import React from 'react';
import { SelectInputProps } from './selectInput.interface';
import { selectInputStyles } from './selectInputStyles';

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  style,
}) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data={data}
      styles={selectInputStyles}
      style={{ width: '100%', ...style }}
    />
  );
};

export default SelectInput;
