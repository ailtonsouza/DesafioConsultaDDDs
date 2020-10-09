import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  open: boolean;
}

const Ul = styled.ul<InputProps>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  a {
    width: 85%;
    margin-top: 5px;
    padding: 10px 10px 10px 10px;
    color: #c59010;
    border-bottom: 2px solid #c59010;
  }
  right: calc(100%);
  flex-flow: column nowrap;
  background-color: #000;
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
  height: 100vh;
  width: 300px;
  padding-top: 3.5rem;
  transition: transform 0.5s ease-in-out;

  div {
    width: 100%;
    height: 55px;
    background-color: #000;
    border-bottom: 2px solid #f1f1f1;
    top: 0;
    position: absolute;
  }
`;

const RightNav: React.FC<InputProps> = ({ open }) => {
  return (
    <Ul open={open}>
      <div></div>
      <Link to="/ManageDDD">Gerenciar DDD</Link>
      <Link to="/ManageTarifa">Gerenciar Tarifa</Link>
      <Link to="/ManagePlano">Gerenciar planos</Link>
      <Link to="/ViewTable">Ver tabela</Link>
    </Ul>
  );
};

export default RightNav;
