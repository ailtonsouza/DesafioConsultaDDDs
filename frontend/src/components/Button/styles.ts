import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #00008e;
  border: 2px solid #008000;
  border-radius: 10px;
  color: #afeeee;
  padding: 4px;
  margin-top: 18px;
  width: 70%;
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.2, '#008000')};
  }
`;
