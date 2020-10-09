import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #008000;
  margin-top: 8px;
  background: #fff;
  width: 95%;
  border-radius: 5px;
  display: flex;
  word-break: break-all;

  .options {
    display: flex;
    align-items: center;
    border-right: 1px solid #008000;
    button {
      margin: none;
      display: flex;
      border: none;
      background: none;
      outline: none;
      svg {
        cursor: pointer;
        size: 1px;
        color: #008000;
      }
    }
  }

  .info {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    width: 100%;
    div {
      margin-left: 10px;
      margin-left: 30px;
    }

    h5 {
      
      margin-bottom: 0px;
      font-size: 20px;
      color: #008000;
    }
    p{
      font-size: 20px;
    }

  }

  div.availability-container {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 8px;

    .switch {
      position: relative;
      margin-right: 8px;
      width: 17px;
      height: 17px;
      content: '';
      border-radius: 50%;
      border: 2px solid #008000;
      background: #fff;
      cursor: pointer;

      & input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
 
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 16px;
      }

      input:checked + .slider {
        background-color: #008000;
      }
    }
  }
`;
