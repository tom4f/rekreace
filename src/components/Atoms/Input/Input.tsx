import React, { InputHTMLAttributes } from 'react';
import { StyledInput } from './StyledInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </StyledInput>
  );
};
