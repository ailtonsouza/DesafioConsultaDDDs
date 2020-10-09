import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('DDD')
class DDD {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCidade: string;

  @Column()
  DDD: string;
}

export default DDD;
