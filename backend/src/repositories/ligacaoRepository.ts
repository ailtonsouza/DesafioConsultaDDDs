import { EntityRepository, Repository } from 'typeorm';
import LIGACAO from '../models/LIGACAO';

@EntityRepository(LIGACAO)
class LIGACAORepository extends Repository<LIGACAO> { }
export default LIGACAORepository;
