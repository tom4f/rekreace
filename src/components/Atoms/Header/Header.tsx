import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Header = ({ children, ...props }: HeaderProps) => {
  return <StyledHeader {...props}>{children}</StyledHeader>;
};

const StyledHeader = styled.header`
  margin: 5px 0;
  background: #555555;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  clear: both;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: lime;
      text-decoration: none;
    }
  }
`;
