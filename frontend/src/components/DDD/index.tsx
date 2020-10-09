import React from 'react';
import { Container } from './styles';

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface IProps {
  DDD: IDDD;
  selectedDDD: boolean;
  handleSelectedDDD: (DDDId: string) => void;
}

const DDD: React.FC<IProps> = ({
  DDD,
  selectedDDD,
  handleSelectedDDD,
}: IProps) => {


  async function toggleAvailable(): Promise<void> {
    handleSelectedDDD(DDD.id);
  }

  return (
    <>
      <Container>
        <div className="options">
          <div className="availability-container">
            <label className="switch">
              <input
                id={DDD.id}
                type="checkbox"
                checked={selectedDDD}
                onChange={toggleAvailable}
              />
              <span className="slider" />
            </label>
          </div>
        </div>
        <div className="info">
          <div>
            <h5>DDD</h5>
            <p>{DDD.DDD}</p>
          </div>
          <div>
            <h5>Descrição</h5>
            <p>{DDD.nomeCidade}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DDD;
