import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import LigacaoRepository from '../repositories/ligacaoRepository';
import LigacaoPlanoRepository from '../repositories/ligacaoRepository';
import CreatePlanoService from '../service/createPlanoService';

const planoRouter = Router();

planoRouter.post('/', async (request, response) => {
  try {
    const {
      valorOriginal,
      origemDDDId,
      destinoDDDId,
      planos
    } = request.body;

    if (!(valorOriginal &&
      origemDDDId &&
      destinoDDDId)) {
      throw Error('Os campos "Primeiro DDD", "Segundo DDD" e "Valor por minuto" devem ser preenchidos')
    }

    const createPlanoService = new CreatePlanoService();

    const ligacao = await createPlanoService.execute({
      valorOriginal,
      origemDDDId,
      destinoDDDId,
      planos
    })

    return response.json(ligacao);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

planoRouter.get('/', async (request, response) => {

  try {
    console.log('f', request.query.firstId, 's', request.query.secondId)
    const ligacaoRepository = getCustomRepository(LigacaoRepository);

    if (request.query.firstId && request.query.secondId) {

      const ligacao = await ligacaoRepository.findOne({ where: { origemDDDId: request.query.firstId, destinoDDDId: request.query.secondId } })

      if (!ligacao) {
        return response.json([]);
      }

      return response.json([ligacao]);
    }

    if (request.query.firstId) {


      const ligacao = await ligacaoRepository.find({ where: { origemDDDId: request.query.firstId } })

      return response.json(ligacao);
    }

    if (request.query.secondId) {


      const ligacao = await ligacaoRepository.find({ where: { destinoDDDId: request.query.secondId } })
      console.log('3', ligacao);
      return response.json(ligacao);
    }

    const ligacao = await ligacaoRepository.find();

    return response.json(ligacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

planoRouter.put('/:id', async (request, response) => {
  try {

    const ligacaoId = request.params.id

    const ligacaoRepository = getCustomRepository(LigacaoRepository);

    const ligacao = await ligacaoRepository.findOne({ where: { id: ligacaoId } });

    if (!ligacao) {
      throw Error('Tarifa não foi encontrada');
    }

    const planosLigacaoId = ligacao.ligacao_planos.map(lp => lp.id);

    const planosLigacaosRepository = getCustomRepository(LigacaoPlanoRepository);

    if (planosLigacaoId.length > 0) {

      await planosLigacaosRepository.delete(planosLigacaoId);

    }

    await ligacaoRepository.delete(ligacao.id);

    const {
      valorOriginal,
      origemDDDId,
      destinoDDDId,
      planos
    } = request.body;

    const createPlanoService = new CreatePlanoService();

    const novaLigacao = await createPlanoService.execute({
      valorOriginal,
      origemDDDId,
      destinoDDDId,
      planos
    })

    return response.json(novaLigacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


planoRouter.delete('/:id', async (request, response) => {
  try {

    const ligacaoId = request.params.id

    const ligacaoRepository = getCustomRepository(LigacaoRepository);

    const ligacao = await ligacaoRepository.findOne({ where: { id: ligacaoId } });

    if (!ligacao) {
      throw Error('Tarifa não foi encontrada');
    }

    await ligacaoRepository.remove(ligacao);

    return response.status(200).json();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

);

export default planoRouter;
