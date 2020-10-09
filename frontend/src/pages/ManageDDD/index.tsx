import React, { useState, useCallback, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { Content } from './styles';
import NavBar from '../../components/NavBar/burguer';
import api from '../../services/api';
import ModalAddDDD from '../../components/ModalAddDDD';
import ModalEditDDD from '../../components/ModalEditDDD';

import DDD from '../../components/DDD';

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [DDDs, setDDDs] = useState<IDDD[]>([]);
  const [selectedDDDs, setselectedDDDs] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function handleAddDDD(
    DDD: Omit<IDDD, 'id'>,
  ): Promise<void> {
    await api.post('/DDD', {
      nomeCidade: DDD.nomeCidade,
      DDD: DDD.DDD,
    }).then((response) => {
      setDDDs([...DDDs, response.data]);
      setModalOpen(!modalOpen)
    }).catch((error) => {
      alert(error.response.data)
    })
  }

  const handleSubmit = useCallback(() => {
    setOpen(!open);
  }, [open]);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  async function handleSelectedDDD(DDDId: string): Promise<void> {
    if (DDDId === selectedDDDs) {
      setselectedDDDs('');
    } else {
      setselectedDDDs(DDDId);
    }
  }

  function toggleEditModal(): void {
    if (selectedDDDs === '') {
      alert('Selecione um DDD para remoção');
    } else {
      setEditModalOpen(!editModalOpen);
    }
  }

  async function handleUpdateDDD(
    data: Omit<IDDD, 'id'>,
  ): Promise<void> {
    const DDD = DDDs.find(
      (selectedDDD) => selectedDDD.id === selectedDDDs,
    );

    if (DDD === undefined) {
      throw new Error('The DDD was not found');
    }

    const response = await api.put(`/DDD/${DDD.id}`, {
      nomeCidade: data.nomeCidade,
      DDD: data.DDD,
    }).then((response) =>

      setDDDs(
        DDDs.map((mapDDD) =>
          mapDDD.id === selectedDDDs ? { ...response.data } : mapDDD,
        ),
      )
    ).catch((error) => {
      alert(error.response.data)
    })
  }

  async function deleteDDD(): Promise<void> {
    console.log(selectedDDDs)
    if (selectedDDDs === '') {
      alert('Selecione um DDD para remoção');
    } else {
      await api
        .delete(`/DDD/${selectedDDDs}`)
        .then(() => {
          setDDDs(
            DDDs.filter((DDD) => DDD.id !== selectedDDDs),
          );
          setselectedDDDs('');
          alert(`DDD deletado com sucesso`);
        })
        .catch((error) => {
          alert(error.response.data)
        });
    }
  }

  useEffect(() => {
    async function loadDDDs(): Promise<void> {
      const listDDDs = await api.get<IDDD[]>('/DDD');
      setDDDs(listDDDs.data);
    }
    loadDDDs();
  }, []);

  return (
    <>
      <NavBar open={open} handleSubmit={handleSubmit} />

      <ModalAddDDD
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddDDD={handleAddDDD}
      />

      <ModalEditDDD
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingDDD={DDDs.find((ddd) => ddd.id === selectedDDDs)}
        handleUpdateDDD={handleUpdateDDD}
      />

      <Content open={open}>
        <div className="header">
          <h1>Gerenciar DDD</h1>
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
            <button onClick={deleteDDD}>
              <FiTrash2 size={20} />
              <h3>Remover</h3>
            </button>
          </div>

          {DDDs.map((value) => (
            <DDD
              key={value.id}
              DDD={value}
              selectedDDD={value.id === selectedDDDs}
              handleSelectedDDD={handleSelectedDDD}
            />
          ))}
        </div>
      </Content>
    </>
  );
};

export default MainPage;
