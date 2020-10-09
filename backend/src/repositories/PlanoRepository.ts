import { EntityRepository, Repository } from 'typeorm';
import PLANO from '../models/PLANO';

@EntityRepository(PLANO)
class PLanoRepository extends Repository<PLANO> {
  public async findByNome(
    nome: string,
  ): Promise<PLANO | undefined> {
    const plano = await this.findOne({
      where: { nome },
    });

    return plano;
  }

}

export default PLanoRepository;
