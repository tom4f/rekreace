import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

import { StyledInput } from './StyledInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.JSX.Element;
  id?: string;
  enableSpin?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, enableSpin, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <StyledInput enableSpin={enableSpin}>
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
