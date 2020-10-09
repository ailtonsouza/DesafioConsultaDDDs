import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;

  .seletor {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }


  .valor {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 40%;
  }

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
  justify-content: center;
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 5px;
  }
`;



