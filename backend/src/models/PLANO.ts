import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import LIGACAO_PLANO from '../models/LIGACAO_PLANO';

@Entity('PLANO')
class PLANO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  minutagem: number;

  @Column()
  percentualMinutosExcedidos: number;

  @OneToMany(() => LIGACAO_PLANO, ligacao_plano => ligacao_plano.id)
  ligacao_planos: LIGACAO_PLANO[];

}

export default PLANO;
