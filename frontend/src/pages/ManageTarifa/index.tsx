import React, { useState, useCallback, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import NavBar from '../../components/NavBar/burguer';
import Tarifa from '../../components/Tarifa';
import ModalAddTarifa from '../../components/ModalAddTarifa';
import ModalEditTarifa from '../../components/ModalEditTarifa';
import api from '../../services/api';
import { Content } from './style';
import getValidationErros from '../../utils/getValidationErros';

interface ligacao_plano {
  plano: {
    nome: string;
    id: string;
  }
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

interface IPlanoLigacao {
  ligacaoId: string;
  plano: {
    id: string,
    nome: string,
  }
}

const ManageTravel: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [tarifas, setTarifas] = useState<ITarifa[]>([]);
  const [selectedTarifa, setselectedTarifa] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function handleAddTarifa(tarifa: Omit<ITarifa, 'id' | 'origemDDD' | 'destinoDDD' | 'ligacao_planos'>): Promise<void> {
    try {
      const response = await api.post('/ligacao', {
        valorOriginal: tarifa.valorOriginal,
        origemDDDId: tarifa.origemDDDId,
        destinoDDDId: tarifa.destinoDDDId,
        planos: tarifa.planos
      })
      setTarifas([...tarifas, response.data]);
      setModalOpen(!modalOpen);
    } catch (error) {
      alert(error.response.data)

    }
  }

  const handleSubmit = useCallback(() => {
    setOpen(!open);
  }, [open]);

  async function handleSelectedTarifa(tarifaId: string): Promise<void> {
    if (tarifaId === selectedTarifa) {
      setselectedTarifa('');
    } else {
      setselectedTarifa(tarifaId);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  async function toggleEditModal(): Promise<void> {

    if (selectedTarifa === '') {
      alert('Selecione ums tarifa para edição');
    } else {
      setEditModalOpen(!editModalOpen);
    }
  }

  useEffect(() => {
    async function loadTarifas(): Promise<void> {
      const tarifas = await api.get<ITarifa[]>('/ligacao');
      setTarifas(tarifas.data);
    }
    loadTarifas();
  }, []);


  async function handleUpdateTarifa(
    data: Omit<ITarifa, 'id'>,
  ): Promise<void> {
    const tarifa = tarifas.find(
      (tarifa) => tarifa.id === selectedTarifa,
    );

    if (tarifa === undefined) {
      throw new Error('A tarifa não foi encontrada');
    }

    const response = await api.put(`/ligacao/${tarifa.id}`, {
      destinoDDDId: data.destinoDDDId,
      origemDDDId: data.origemDDDId,
      valorOriginal: data.valorOriginal,
      planos: data.planos,
    });

    setTarifas(
      tarifas.map((tarifa) =>
        tarifa.id === selectedTarifa ? { ...response.data } : tarifa,
      ),
    );
    setEditModalOpen(!editModalOpen);
  }


  async function deleteTarifa(): Promise<void> {

    if (selectedTarifa === '') {
      alert('Selecione uma tarifa para remoção');
    } else {
      await api
        .delete(`/ligacao/${selectedTarifa}`)
        .then(() => {
          setTarifas(
            tarifas.filter((tarifa) => tarifa.id !== selectedTarifa),
          );
          setselectedTarifa('');
          alert(`Tarifa deletado com sucesso`);
        })
        .catch((err) => {
          console.log(err);
          alert(
            err.response
          );
        });
    }
  }


  return (
    <>
      <ModalAddTarifa
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddTarifa={handleAddTarifa}
      />

      <ModalEditTarifa
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingTarifa={tarifas.find((tarifa) => tarifa.id === selectedTarifa)}
        handleUpdateTarifa={handleUpdateTarifa}
      />

      <NavBar open={open} handleSubmit={handleSubmit} />
      <Content open={open}>
        <div className="header">
          <h1>Gerenciar Tarifas</h1>
        </div>
        <div className="body">
          <div className="menuBar">
            <button onClick={toggleModal}>
              <FiPlus size={20} />
              <h3>Add</h3>
            </button>
            <button onClick={toggleEditModal}>
              <FiEdit size={20} />
              <h3>Edit</h3>
            </button>
            <button onClick={deleteTarifa}>
              <FiTrash2 size={20} />
              <h3>Remover</h3>
            </button>
          </div>
          {tarifas.map((tarifa) => (
            <Tarifa
              key={tarifa.id}
              tarifa={tarifa}
              selectedTarifa={tarifa.id === selectedTarifa}
              handleSelectedTarifa={handleSelectedTarifa}
            />
          ))}
        </div>
      </Content>
    </>
  );
};

export default ManageTravel;
