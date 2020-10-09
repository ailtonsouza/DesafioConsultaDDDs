import React, { useState, useCallback, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { Content } from './style';
import NavBar from '../../components/NavBar/burguer';
import api from '../../services/api';
import ModalAddPlano from '../../components/ModalAddPlano';
import ModalEditPlano from '../../components/ModalEditPlano';


import Plano from '../../components/Plano';

interface IPlano {
  id: string;
  nome: string;
  minutagem: string;
  percentualMinutosExcedidos: string;
}

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [planos, setPlanos] = useState<IPlano[]>([]);
  const [selectedPlano, setSelectedPlano] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function handleAddPlano(
    plano: Omit<IPlano, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.post('/plano', {
        nome: plano.nome,
        minutagem: plano.minutagem,
        percentualMinutosExcedidos: plano.percentualMinutosExcedidos,
      });
      setPlanos([...planos, response.data]);
      setModalOpen(!modalOpen);
    } catch (err) {
      console.log(err);
    }
  }


  async function handleUpdatePlano(
    data: Omit<IPlano, 'id'>,
  ): Promise<void> {
    const plano = planos.find(
      (plano) => plano.id == selectedPlano,
    );

    if (plano === undefined) {
      throw new Error('Plano não encontrado');
    }

    const response = await api.put(`/plano/${plano.id}`, {
      nome: data.nome,
      minutagem: data.minutagem,
      percentualMinutosExcedidos: data.percentualMinutosExcedidos,
    });

    setPlanos(
      planos.map((plano) =>
        plano.id === selectedPlano ? { ...response.data } : plano,
      ),
    );
    setEditModalOpen(!editModalOpen);
  }




  const handleSubmit = useCallback(() => {
    setOpen(!open);
  }, [open]);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  async function handleSelectedPlano(planoId: string): Promise<void> {
    if (planoId === selectedPlano) {
      setSelectedPlano('');
    } else {
      setSelectedPlano(planoId);
    }
  }

  function toggleEditModal(): void {
    if (selectedPlano === '') {
      alert('Selecione um carro para remoção');
    } else {
      setEditModalOpen(!editModalOpen);
    }
  }

  async function deletePlano(): Promise<void> {
    if (selectedPlano === '') {
      alert('Selecione um PLano para remoção');
    } else {
      await api
        .delete(`/plano/${selectedPlano}`)
        .then(() => {
          setPlanos(
            planos.filter((plano) => plano.id !== selectedPlano),
          );
          setSelectedPlano('');
          alert(`Plano deletado com sucesso`);
        })
        .catch((err) => {
          console.log(err);
          alert(
            err
          );
        });
    }
  }

  useEffect(() => {
    async function loadPlanos(): Promise<void> {
      const listPlanos = await api.get<IPlano[]>('/plano');
      setPlanos(listPlanos.data);
    }
    loadPlanos();
  }, []);

  return (
    <>
      <NavBar open={open} handleSubmit={handleSubmit} />

      <ModalAddPlano
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddPlano={handleAddPlano}
      />

      <ModalEditPlano
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingPlano={planos.find((planos) => planos.id === selectedPlano)}
        handleUpdatePlano={handleUpdatePlano}
      />

      <Content open={open}>
        <div className="header">
          <h1>Gerenciar Planos</h1>
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
            <button onClick={deletePlano}>
              <FiTrash2 size={20} />
              <h3>Remover</h3>
            </button>
          </div>

          {planos.map((value) => (
            <Plano
              key={value.id}
              plano={value}
              selectedPlano={value.id === selectedPlano}
              handleSelectedPlano={handleSelectedPlano}
            />
          ))}
        </div>
      </Content>
    </>
  );
};

export default MainPage;
