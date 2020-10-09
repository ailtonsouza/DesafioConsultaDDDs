import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

interface InputBurguerProps extends InputHTMLAttributes<HTMLInputElement> {
  open: boolean;
  handleSubmit: () => void;
}

interface BurguerProps {
  open: boolean;
}

const StyledBurguer = styled.div<BurguerProps>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 9px;
  margin-left: 15px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      transform: ${({ open }) =>
    open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burguer: React.FC<InputBurguerProps> = ({ open, handleSubmit }) => {
  return (
    <>
      <StyledBurguer open={open} onClick={() => handleSubmit()}>
        <div />
        <div />
        <div />
      </StyledBurguer>
      <RightNav open={open} />
    </>
  );
};

export default Burguer;
