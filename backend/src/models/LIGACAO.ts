import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import DDD from './DDD';
import LIGACAO_PLANO from '../models/LIGACAO_PLANO';


@Entity('LIGACAO')
class LIGACAO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  valorOriginal: number;

  @Column()
  origemDDDId: string;

  @ManyToOne(() => DDD, { eager: true })
  @JoinColumn({ name: 'origemDDDId' })
  origemDDD: DDD;

  @Column()
  destinoDDDId: string;

  @ManyToOne(() => DDD, { eager: true })
  @JoinColumn({ name: 'destinoDDDId' })
  destinoDDD: DDD;

  @OneToMany(() => LIGACAO_PLANO, ligacao_plano => ligacao_plano.ligacao, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true
  })
  ligacao_planos: LIGACAO_PLANO[];

}

export default LIGACAO;
