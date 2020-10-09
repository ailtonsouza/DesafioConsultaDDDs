import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`


  background: #afeeee;
  border-radius: 10px;
  padding: 12px 12px 12px 12px;
  border: 2px solid #afeeee;
  width: 90%;
  display: flex;
  align-items: center;
  color: #ffff;

  & + div {
    margin-top: 16px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid #008000;
      color: #008000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #008000;
    `}

  input {
    color: #008000;
    &::placeholder {
      color: #008000;
    }

    border: transparent;
    background: transparent;
    flex: 1;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  width: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    &::before {
      border-color: transparent #008000 transparent transparent;
    }
  }
`;
