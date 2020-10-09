import React, { useState } from 'react';
// import { format, parseISO } from 'date-fns';
// import { Collapse } from 'reactstrap';
import { Container } from './styles';
// import api from '../../services/api';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface IPlano {
  id: string;
  nome: string;
  minutagem: string;
  percentualMinutosExcedidos: string;
}

interface IProps {
  plano: IPlano;
  selectedPlano: boolean;
  handleSelectedPlano: (planoId: string) => Promise<void>;
}

const Tarifa: React.FC<IProps> = ({
  plano,
  selectedPlano,
  handleSelectedPlano,
}: IProps) => {

  async function toggleAvailable(): Promise<void> {
    handleSelectedPlano(plano.id);
  }

  const [isCollapse, setIsCollapse] = useState(false);
  // const [itemToDeliver, setItemToDeliver] = useState<ITarifa[]>([]);
  // const [deliveredItem, setDeliveredItem] = useState<ITarifa[]>([]);
  const [, setIcon] = useState('fa fa-chevron-down');

  const toggle = () => {
    setIsCollapse(!isCollapse);
    setIcon((state) => {
      return state === 'fa fa-chevron-down'
        ? 'fa fa-chevron-right'
        : 'fa fa-chevron-down';
    });
  };

  // useEffect(() => {
  //   async function loadItemToDeliver(): Promise<void> {
  //     const iToDeliver = await api.get<IItemTodeliver[]>(
  //       `/itemtodeliver?routeId=${travel.id}`,
  //     );
  //     setItemToDeliver(iToDeliver.data);
  //   }
  //   loadItemToDeliver();
  // }, []);

  // useEffect(() => {
  //   async function loadItemToDeliver(): Promise<void> {
  //     const deliveredItem = await api.get<IDeliveredItem[]>(`/delivereditem`);
  //     setDeliveredItem(deliveredItem.data);
  //   }
  //   loadItemToDeliver();
  // }, []);

  return (
    <>
      <Container onClick={() => 'console.log(tarefa.id)'}>
        <div className="options">
          <div className="availability-container">
            <label className="switch">
              <input
                id={plano.id}
                type="checkbox"
                checked={selectedPlano}
                onChange={toggleAvailable}
              />
              <span className="slider" />
            </label>
          </div>

        </div>
        <div className="info">
          <div className="column">
            <h5 >Nome</h5>
            <p>{plano.nome}</p>
          </div>
          <div className="column">
            <h5 >Franquia em minutos</h5>
            <p>{plano.minutagem}</p>
          </div>
          <div className="column">
            <h5 >Tarifa Normal</h5>
            <p>{plano.percentualMinutosExcedidos}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tarifa;
