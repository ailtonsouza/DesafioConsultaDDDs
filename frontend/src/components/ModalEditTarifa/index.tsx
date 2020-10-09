import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form, Container } from './styles';
import Input from '../Input';
import Modal from '../Modal';
import DropDownList from '../DropDownList';
import CreatableSelect from '../List/index';
import api from '../../services/api';

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface ITarifa {
  id: string;
  valorOriginal: number;
  origemDDDId: string;
  planos: string[];
  origemDDD: {
    nomeCidade: string;
    DDD: string;
  };
  destinoDDD: {
    nomeCidade: string;
    DDD: string;
  };
  destinoDDDId: string;
  ligacao_planos: ligacao_plano[];
}

interface ligacao_plano {
  plano: {
    nome: string;
    id: string;
  }
}


interface IPlano {
  id: string;
  nome: string;
  minutagem: string;
  percentualMinutosExcedidos: string;
  checked: boolean;
}

interface IOptions {
  label: string,
  value: string,
}


interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateTarifa: (tarifa: ITarifa) => void;
  editingTarifa: ITarifa | undefined;
}

const ModalEditTarifa: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingTarifa,
  handleUpdateTarifa,
}) => {
  const [optionsDDD, setOptionsDDD] = useState<IOptions[]>([]);
  const [key, setKey] = useState<IOptions[]>([]);
  const formRef = useRef<FormHandles>(null);
  const [DDD, setDDD] = useState<IDDD[]>([]);
  const [planos, setPlano] = useState<IPlano[]>([]);

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

  const handleSubmit = useCallback(
    async (data: ITarifa) => {
      console.log(data);
      handleUpdateTarifa(data);
    },
    [handleUpdateTarifa],
  );

  useEffect(() => {
    async function loadPlano(): Promise<void> {
      const planoss = await api.get<IPlano[]>('/plano');
      console.log(planos);
      const keys = planoss.data.map(x => {
        return {
          value: x.id, label: x.nome
        }
      })
      setKey(keys)
      setPlano(planoss.data);
    }
    loadPlano();
  }, []);


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingTarifa}>
        <h1>Editar tarifa</h1>
        <div className="seletor">
          <Container>

            <h4>Primeiro DDD </h4>
            <DropDownList
              name="origemDDDId"
              placeHolder="DDD"
              defaultValue={editingTarifa?.destinoDDD.DDD ? { label: editingTarifa.origemDDD.DDD, value: editingTarifa.origemDDDId } : optionsDDD[0]}
              options={optionsDDD}
            />
          </Container>
          <Container>
            <h4>Segundo DDD </h4>
            <DropDownList
              name="destinoDDDId"
              placeHolder="DDD"
              options={optionsDDD}
              defaultValue={editingTarifa?.destinoDDD.DDD ? { label: editingTarifa.destinoDDD.DDD, value: editingTarifa.destinoDDDId } : optionsDDD[1]}
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
          <CreatableSelect name="planos" option={key} defaultValue={editingTarifa ? editingTarifa.ligacao_planos.map(lp => { return { label: lp.plano.nome, value: lp.plano.id } }) : null} />
        </Container>

        <button className="icon" type="submit">

          <p>Editar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditTarifa;
