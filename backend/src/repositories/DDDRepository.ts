import { EntityRepository, Repository } from 'typeorm';
import DDD from '../models/DDD';

@EntityRepository(DDD)
class DDDRepository extends Repository<DDD> { }
export default DDDRepository;
