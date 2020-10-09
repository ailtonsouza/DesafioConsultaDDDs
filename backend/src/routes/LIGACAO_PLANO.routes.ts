import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Ligacao_planoRepository from '../repositories/ligacao_planoRepository';

const ligacao_planoRouter = Router();

ligacao_planoRouter.post('/', async (request, response) => {
  try {
    const {
      ligacaoId,
      planoId,
    } = request.body;

    const ligacao_planoRepository = getCustomRepository(Ligacao_planoRepository);

    const ligacao_plano = ligacao_planoRepository.create({
      ligacaoId,
      planoId,
    });

    await ligacao_planoRepository.save(ligacao_plano);

    return response.json(ligacao_plano);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

ligacao_planoRouter.get('/', async (request, response) => {
  try {

    const ligacao_planoRepository = getCustomRepository(Ligacao_planoRepository);

    const ligacao_plano = await ligacao_planoRepository.find();

    return response.json(ligacao_plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// ligacao_planoRouter.delete('/', async (request, response) => {
//   try {
//     const {
//       planos_tarifas,
//     } = request.body;

//     const ligacao_planoRepository = getCustomRepository(Ligacao_planoRepository);

//     const ligacao_planos = 

//     const ligacao_plano = await ligacao_planoRepository.remove[]

//     return response.json(ligacao_plano);
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

ligacao_planoRouter.get('/:id', async (request, response) => {
  try {

    const plano = request.params.id;

    console.log(plano)

    const ligacao_planoRepository = getCustomRepository(Ligacao_planoRepository);

    const ligacao_plano = await ligacao_planoRepository.find({ ligacaoId: plano });

    return response.json(ligacao_plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default ligacao_planoRouter;
