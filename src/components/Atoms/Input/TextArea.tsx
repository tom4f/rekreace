import React, { TextareaHTMLAttributes, useId } from 'react';

import { StyledInput } from './StyledInput';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.JSX.Element;
  id?: string;
}

export const TextArea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <StyledInput>
      {label && <label htmlFor={textareaId}>{label}</label>}
      <textarea
        id={textareaId}
        aria-label={typeof label === 'string' ? label : undefined}
        {...props}
      />
    </StyledInput>
  );
};
