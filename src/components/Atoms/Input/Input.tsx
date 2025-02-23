import React, { forwardRef,InputHTMLAttributes  } from 'react';

import { StyledInput } from './StyledInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | React.JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <StyledInput>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} {...props} />
      </StyledInput>
    );
  }
);
