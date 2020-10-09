import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  align-items: center;

  img {
    width: 60%;
    height: 40%;
  }

  a {
    color: #000;
    margin-top: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#008000')};
    }
  }

  svg {
    margin-right: 12px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid #008000;
    width: 340px;
    height: 380px;

    text-align: center;
    background: #fff;
    border-radius: 10%;

    a {
      color: #000;
      margin-top: 25px;
      text-decoration: none;
    }

    h1 {
      margin-bottom: 20px;
    }
  }
`;
