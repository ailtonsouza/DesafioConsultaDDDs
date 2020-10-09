import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .icon {
    margin-top: 48px;
    align-self: flex-end;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Container = styled.div`
  margin-top: 10px;
  h4 {
    margin-bottom: 5px;
    margin-right: 30px;
  }
`;
