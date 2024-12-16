import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

const buttonStyles = {
  primary: css`
    background-color: rgba(0, 256, 0, 0.4);
    color: white;

    &:hover {
      border: 1px solid black;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #565e64;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `,
};

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  border-radius: 5px;
  border: 1px solid white;
  padding: 10px;
  margin: 5px;

  transition: background-color 3s;

  ${({ variant }) => buttonStyles[variant]}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {label}
    </StyledButton>
  );
};
