import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import LIGACAO from './LIGACAO';
import PLANO from './PLANO';

@Entity('LIGACAO_PLANO')
class LIGACAO_PLANO {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  ligacaoId: string;

  @ManyToOne(() => LIGACAO, LIGACAO => LIGACAO.ligacao_planos,)
  @JoinColumn({ name: 'ligacaoId' })
  ligacao: LIGACAO;

  @Column()
  planoId: string;

  @ManyToOne(() => PLANO, PLANO => PLANO.ligacao_planos, {
    eager: true,

  })
  @JoinColumn({ name: 'planoId' })
  plano: PLANO;

}

export default LIGACAO_PLANO;
