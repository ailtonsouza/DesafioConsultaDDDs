import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
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
  handleUpdatePlano: (plano: Omit<IPlano, 'id'>) => void;
  editingPlano: IPlano | undefined;
}

const ModalAddDDD: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingPlano,
  handleUpdatePlano,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: Omit<IPlano, 'id'>) => {
      handleUpdatePlano(data);
    },
    [handleUpdatePlano],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingPlano}>
        <h1>Editar DDD</h1>
        <h4>Nome do plano</h4>
        <Input name="nome" placeholder="Nome do plano"></Input>
        <h4>Franquia do plano</h4>
        <Input name="minutagem" placeholder="Franquia"></Input>
        <h4>Percentual por minuto extra</h4>
        <Input name="percentualMinutosExcedidos" placeholder="Percentual por minuto extra"></Input>
        <button type="submit">
          <p>Editar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddDDD;
