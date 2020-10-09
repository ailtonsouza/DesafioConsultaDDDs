import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PlanoRepository from '../repositories/PlanoRepository';

const planoRouter = Router();

planoRouter.post('/', async (request, response) => {
  try {
    const {
      nome,
      minutagem,
      percentualMinutosExcedidos,
    } = request.body;

    const planoRepository = getCustomRepository(PlanoRepository);

    const plano = planoRepository.create({
      nome,
      minutagem,
      percentualMinutosExcedidos
    });

    await planoRepository.save(plano);

    return response.json(plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

planoRouter.get('/', async (request, response) => {
  try {


    const planoRepository = getCustomRepository(PlanoRepository);

    const plano = await planoRepository.find();

    return response.json(plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


planoRouter.put('/:id', async (request, response) => {
  try {

    const planoId = request.params.id

    const planoRepository = getCustomRepository(PlanoRepository);

    const plano = await planoRepository.findOne({ where: { id: planoId } });

    if (!plano) {
      throw Error('Plano não encontrado');
    }

    const {
      nome,
      minutagem,
      percentualMinutosExcedidos,
    } = request.body;

    plano.minutagem = minutagem;
    plano.nome = nome;
    plano.percentualMinutosExcedidos = percentualMinutosExcedidos;

    await planoRepository.save(plano);

    return response.json(plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


planoRouter.delete('/:id', async (request, response) => {
  try {

    const planoId = request.params.id

    const planoRepository = getCustomRepository(PlanoRepository);

    const plano = await planoRepository.findOne({ where: { id: planoId } });

    if (!plano) {
      throw Error('Tarifa não foi encontrada');
    }

    await planoRepository.remove(plano);

    return response.status(200).json();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

);

export default planoRouter;
