import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form, Container } from './styles';
import Input from '../Input';
import Modal from '../Modal';

interface ICreateDDDData {
  nomeCidade: string;
  DDD: string;
}

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddDDD: (DDD: Omit<IDDD, 'id'>) => void;
}

const ModalAddDDD: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddDDD,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(

    async (data: ICreateDDDData) => {
      const DDD = {
        nomeCidade: data.nomeCidade,
        DDD: data.DDD,
      };
      handleAddDDD(DDD);
    },
    [handleAddDDD],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo DDD</h1>

        <Container>
          <h4>Adicione o numero do DDD</h4>
          <Input name="DDD" placeholder="Numero do DDD"></Input>
        </Container>
        <Container>
          <h4>Descrição do DDD</h4>
          <Input name="nomeCidade" placeholder="Descrição do DDD"></Input>
        </Container>


        <button className="icon" type="submit">
          <p>Adicionar DDD</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddDDD;
