import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(50, 50, 50, 0.8);
`

const CloseDiv = styled.div`
    background: black;
    text-align: right;
    cursor: pointer;
    background-color: rgba(50, 50, 50, 0.8);
    height: 20px;
`

export const Modal = ({
    setIsVisible,
    children,
}: {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}) => {
    return (
        <StyledDiv>
            <CloseDiv onClick={() => setIsVisible(false)}>X&nbsp;</CloseDiv>
            <>{children}</>
        </StyledDiv>
    )
}
