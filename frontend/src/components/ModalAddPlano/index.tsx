import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form, Container } from './styles';
import Input from '../Input';
import Modal from '../Modal';

interface IPlano {
  id: string;
  nome: string;
  minutagem: string;
  percentualMinutosExcedidos: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddPlano: (Plano: Omit<IPlano, 'id'>) => void;
}

const ModalAddPlano: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPlano,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(

    async (data: Omit<IPlano, 'id'>,) => {
      const plano = {
        nome: data.nome,
        minutagem: data.minutagem,
        percentualMinutosExcedidos: data.percentualMinutosExcedidos,
      };
      handleAddPlano(plano);
    },
    [handleAddPlano],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo DDD</h1>

        <Container>
          <h4>Adicione o nome do plano</h4>
          <Input name="nome" placeholder="Nome"></Input>
        </Container>
        <Container>
          <h4>Adicione a franquia</h4>
          <Input name="minutagem" placeholder="Franquia do plano"></Input>
        </Container>
        <Container>
          <h4>Percentual por minuto extra</h4>
          <Input name="percentualMinutosExcedidos" placeholder="Percentual por minuto extra"></Input>
        </Container>


        <button className="icon" type="submit">
          <p>Adicionar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddPlano;
