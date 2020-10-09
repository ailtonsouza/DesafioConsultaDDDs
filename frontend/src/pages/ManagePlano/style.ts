import styled from 'styled-components';

interface BurguerProps {
  open: boolean;
}

export const Content = styled.div<BurguerProps>`
  display: flex;
  flex-direction: column;

  .header {
    @media (max-width: 768px) {
      display: flex;
    }
    width: 100%;
    height: 55px;
    border-bottom: 2px solid #fff;
    text-align: center;
  }

  .body {
    margin-top: 10px;
    transform: ${({ open }) =>
    open ? 'translateX(325px)' : 'translateX(25px)'};
    transition: transform 0.5s ease-in-out;
    text-align: left;
    width: ${({ open }) => (open ? 'calc(100% - 325px)' : 'calc(100% - 25px)')};
    height: calc(100vh - 80px);
  }

  .menuBar {
    display: flex;
    justify-content: space-around;
    height: 65px;
    width: 25%;
    border-bottom: 2px solid #fff;
    align-items: center;
    h3 {
      font-size: 15px;
    }
    button {
      align-items: column;
      background: none;
      border: none;
      outline: none;
      svg {
        width: 30px;
      }
    }
  }

  form {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    width: 300px;
    padding: 30px;
  }
`;
