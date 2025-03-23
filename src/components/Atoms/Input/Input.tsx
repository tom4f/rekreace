import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

import { StyledInput } from './StyledInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.JSX.Element;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <StyledInput>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          aria-label={typeof label === 'string' ? label : undefined}
          {...props}
        />
      </StyledInput>
    );
  }
);
