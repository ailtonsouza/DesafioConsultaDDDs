import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form, Container } from './styles';
import DropDownList from '../DropDownList';
import Input from '../Input';
import Modal from '../Modal';
import api from '../../services/api';
import CreatableSelect from '../List/index';

interface ligacao_plano {
  plano: {
    nome: string;
  }
}


interface ITarifa {
  id: string;
  valorOriginal: number;
  destinoDDDId: string;
  origemDDDId: string;
  planos: string[];
  ligacao_planos: ligacao_plano[];
}




interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface IPlano {
  id: string;
  nome: string;
  minutagem: string;
  percentualMinutosExcedidos: string;
  checked: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTarifa: (tarifa: Omit<ITarifa, 'id' | 'ligacao_planos'>) => void;
}

interface IOptions {
  label: string,
  value: string,
}


const ModalAddDDD: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTarifa,
}) => {
  const [DDD, setDDD] = useState<IDDD[]>([]);
  const [, setPlano] = useState<IPlano[]>([]);
  const [optionsDDD, setOptionsDDD] = useState<IOptions[]>([]);
  const [key, setKey] = useState<IOptions[]>([]);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadDDD(): Promise<void> {
      const DDDs = await api.get<IDDD[]>('/ddd');
      setDDD(DDDs.data);
    }
    loadDDD();
  }, []);

  useEffect(() => {
    async function loadOptionsDDD(): Promise<void> {
      const value = DDD.map((ddd, i) => {
        return { label: ddd.DDD, value: ddd.id, number: i };
      });
      setOptionsDDD(value);

    }
    loadOptionsDDD();
  }, [DDD]);

  useEffect(() => {
    async function loadPlano(): Promise<void> {
      const planos = await api.get<IPlano[]>('/plano');

      const keys = planos.data.map(x => {
        return {
          value: x.id, label: x.nome
        }
      })
      setKey(keys)
      setPlano(planos.data);
    }
    loadPlano();
  }, []);

  const handleSubmit = useCallback(
    async (data: Omit<ITarifa, 'id'>) => {

      console.log(data.planos);
      if (data.destinoDDDId === data.origemDDDId) {
        alert('Os DDDs não podem ser os mesmos');
        return;
      }

      const tarifa = {
        destinoDDDId: data.destinoDDDId,
        origemDDDId: data.origemDDDId,
        valorOriginal: data.valorOriginal,
        planos: data.planos
      };

      handleAddTarifa(tarifa);
    },
    [handleAddTarifa],
  );

  return (

    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova tarifa</h1>
        <div className="seletor">
          <Container>

            <h4>Primeiro DDD </h4>
            <DropDownList
              name="origemDDDId"
              placeHolder="DDD"
              options={optionsDDD}
            />
          </Container>
          <Container>
            <h4>Segundo DDD </h4>
            <DropDownList
              name="destinoDDDId"
              placeHolder="DDD"
              options={optionsDDD}
            />
          </Container>
          <Container>
            <h4>Valor por minuto</h4>
            <Input
              name="valorOriginal"
              placeholder="Valor da tarifa"
              type="float"
            ></Input>
          </Container>

        </div>
        <Container>
          <h4>Planos disponiveis</h4>
          <CreatableSelect name="planos" option={key} />
        </Container>

        <button className="icon" type="submit">

          <p>Adicionar tarifa</p>
        </button>
      </Form>

    </Modal>
  );
};

export default ModalAddDDD;
