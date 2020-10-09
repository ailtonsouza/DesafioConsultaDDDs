import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { Collapse } from 'reactstrap';
import { Container } from './styles';
import api from '../../services/api';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface ligacao_plano {
  plano: {
    nome: string;
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

interface Iplano {
  id: string,
  plano: {
    nome: string
    minutagem: number,
    percentualMinutosExcedidos: number
  }
}

interface IProps {
  tarifa: ITarifa;
  selectedTarifa: boolean;
  handleSelectedTarifa: (tarifaId: string) => Promise<void>;
}

const Tarifa: React.FC<IProps> = ({
  tarifa,
  selectedTarifa,
  handleSelectedTarifa,
}: IProps) => {

  async function toggleAvailable(): Promise<void> {
    handleSelectedTarifa(tarifa.id);
  }

  const [isCollapse, setIsCollapse] = useState(false);
  const [planos, setPlanos] = useState<Iplano[]>([]);
  const [, setIcon] = useState('fa fa-chevron-down');

  const toggle = () => {
    setIsCollapse(!isCollapse);
    setIcon((state) => {
      return state === 'fa fa-chevron-down'
        ? 'fa fa-chevron-right'
        : 'fa fa-chevron-down';
    });
  };

  useEffect(() => {
    async function loadListaPLanos(): Promise<void> {
      const listaPlano = await api.get<Iplano[]>(
        `/ligacaoplano/${tarifa.id}`,
      );
      if (listaPlano.data) {
        setPlanos(listaPlano.data);
      } else {
        setPlanos([])
      }
    }
    loadListaPLanos();
  }, []);



  return (
    <>
      <Container onClick={() => 'console.log(tarefa.id)'}>
        <div className="options">
          <div className="availability-container">
            <label className="switch">
              <input

                id={tarifa.id}
                type="checkbox"
                checked={selectedTarifa}
                onChange={toggleAvailable}
              />
              <span className="slider" />
            </label>
          </div>

          <button type="button" onClick={() => toggle()}>
            {isCollapse ? (
              <FiChevronDown size={25} />
            ) : (
                <FiChevronRight size={25} />
              )}
          </button>
        </div>
        <div className="info">
          <div >
            <h5 className="title">DDD Origem</h5>
            <p>{tarifa.origemDDD.DDD}</p>
            <h5 className="title">DDD Destino</h5>
            <p>{tarifa.destinoDDD.DDD}</p>
          </div>
          <div >
            <h5 className="title">Tarifa Normal <br /> por minuto</h5>
            <p>R${tarifa.valorOriginal}</p>
          </div>
          <div >
            <h5 className="title">Planos disponiveis</h5>
            {
              planos.length !== 0 ?
                planos.map((x) => {

                  return (
                    <div key={x.id}>
                      <p>{x.plano.nome}</p>
                      <Collapse className="abcd" isOpen={isCollapse}>
                        <h5>Franquia: {x.plano.minutagem} minutos</h5>
                        <h5>Custo por minuto que <br />  exceder  franquia: R${x.plano.percentualMinutosExcedidos * tarifa.valorOriginal}</h5>
                      </Collapse>
                    </div>
                  )

                }) : <div><p>Nenhum</p></div>
            }


          </div>


        </div>
      </Container>
    </>
  );
};

export default Tarifa;
