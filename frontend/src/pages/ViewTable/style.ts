import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
interface BurguerProps {
  open: boolean;
}

export const Content = styled.div<BurguerProps>`

h1{
  color: #000;
}


button{
  width: 100px;
 
}

div .box{
  margin-right: 20px;
  width: 200px;
}


select{
  width: 1500px;


}


  td{
    border: 1px solid #000000;
  width: 7vw;
  vertical-align: center;
  text-align: center;
  justify-content: space-between;
  }



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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    transform: ${({ open }) =>
    open ? 'translateX(325px)' : 'translateX(25px)'};
    transition: transform 0.5s ease-in-out;
    text-align: left;
    width: ${({ open }) => (open ? 'calc(100% - 325px)' : 'calc(100% - 25px)')};
    height: calc(100vh - 80px);
  }

 
`;


export const Form = styled(Unform)`
margin-bottom: 30px;
    padding: 48px 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

input{
  height:11.5px;
}

`;

