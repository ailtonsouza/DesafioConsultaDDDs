import { getCustomRepository } from 'typeorm';
import LigaçãoPlano from '../models/LIGACAO_PLANO';
import Ligação from '../models/LIGACAO';

import PlanoRepositoy from '../repositories/PlanoRepository';
import LigacaoRepository from '../repositories/ligacaoRepository';


interface IRequest {
  valorOriginal: number;
  origemDDDId: string;
  destinoDDDId: string;
  planos: string[];
}

class CreateAdressService {
  public async execute({
    valorOriginal,
    origemDDDId,
    destinoDDDId,
    planos,
  }: IRequest): Promise<LigaçãoPlano | Ligação | undefined> {

    if (!(valorOriginal &&
      origemDDDId &&
      destinoDDDId)) {
      throw Error('O DDD de origem e destino assim como a tarifa por minuto devem ser preenchidos');
    }

    const ligacaoRepository = getCustomRepository(LigacaoRepository);

    const PlanoRepository = getCustomRepository(PlanoRepositoy);

    const findPlanos = await PlanoRepository.findByIds(planos);

    const planoid = findPlanos.map(p => { return { planoId: p.id } })

    const ligacao = ligacaoRepository.create({
      valorOriginal,
      origemDDDId,
      destinoDDDId,
      ligacao_planos: planoid,
    });

    await ligacaoRepository.save(ligacao)

    const ligacao2 = await ligacaoRepository.findOne({ where: { id: ligacao.id } })

    return ligacao2;
  }
}


export default CreateAdressService;
