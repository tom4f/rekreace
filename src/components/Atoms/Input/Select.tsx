import React, { SelectHTMLAttributes } from 'react';

import { StyledInput } from './StyledInput';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  ...props
}) => {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledInput>
  );
};
