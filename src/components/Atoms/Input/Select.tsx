import React, { SelectHTMLAttributes, useId } from 'react';

import { StyledInput } from './StyledInput';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <StyledInput>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} {...props}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </StyledInput>
  );
};
