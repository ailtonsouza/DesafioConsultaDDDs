import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 200px;

    background: #008000;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    left: 80%;
    transform: translateX(30%);
    position: absolute;
    bottom: calc(-44%);
    color: #fff;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      border: 18px solid;
      left: -35px;
      top: -1px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
