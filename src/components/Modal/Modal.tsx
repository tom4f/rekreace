import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type CustomStyle = {
  [key: string]: string;
};

export const Modal = ({
  setIsVisible,
  children,
  customStyle,
}: {
  setIsVisible?: (status: boolean) => void;
  children: ReactNode;
  customStyle?: CustomStyle;
}) => {
  return (
    <StyledDiv customStyle={customStyle}>
      {setIsVisible && (
        <CloseDiv onClick={() => setIsVisible(false)}>X&nbsp;</CloseDiv>
      )}
      <>{children}</>
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{
  customStyle?: CustomStyle;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2;
  background-color: rgba(50, 50, 50, 0.8);
  width: 100%;
  height: 100%;

  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}
`;

const CloseDiv = styled.div`
  background: black;
  text-align: right;
  cursor: pointer;
  background-color: rgba(50, 50, 50, 0.8);
  height: 25px;
`;
