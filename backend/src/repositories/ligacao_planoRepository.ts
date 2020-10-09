import { EntityRepository, Repository } from 'typeorm';
import LIGACAO_PLANO from '../models/LIGACAO_PLANO';

@EntityRepository(LIGACAO_PLANO)
class LIGACAO_PLANORepository extends Repository<LIGACAO_PLANO> { }
export default LIGACAO_PLANORepository;
