import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Input from '../Input';
import Modal from '../Modal';

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateDDD: (DDD: Omit<IDDD, 'id'>) => void;
  editingDDD: IDDD | undefined;
}

const ModalAddDDD: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingDDD,
  handleUpdateDDD,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: Omit<IDDD, 'id'>) => {
      handleUpdateDDD(data);
    },
    [handleUpdateDDD],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingDDD}>
        <h1>Editar DDD</h1>
        <h4>Novo numero do DDD</h4>
        <Input name="DDD" placeholder="Numero do DDD"></Input>
        <h4>Nova descrição</h4>
        <Input name="nomeCidade" placeholder="Descrição do DDD"></Input>
        <button type="submit">
          <p>Editar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddDDD;
