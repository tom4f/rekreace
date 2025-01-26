import React, { TextareaHTMLAttributes } from 'react';

import { StyledInput } from './StyledInput';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </StyledInput>
  );
};
