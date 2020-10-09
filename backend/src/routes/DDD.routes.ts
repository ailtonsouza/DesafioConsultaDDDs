import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DDDRepository from '../repositories/DDDRepository';

const DDDRouter = Router();

DDDRouter.post('/', async (request, response) => {
  try {
    const {
      nomeCidade,
      DDD,
    } = request.body;

    if (!DDD) {
      throw Error('Você não pode cadastrar o DDD, sem o numero do DDD')
    }

    const dddRepository = getCustomRepository(DDDRepository);

    const ddd = await dddRepository.findOne({ where: { DDD: DDD } });

    if (ddd) {
      throw Error('O DDD que você está tentando cadastrar já existe.')
    }

    const plano = dddRepository.create({
      nomeCidade,
      DDD,
    });

    await dddRepository.save(plano);

    return response.json(plano);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

DDDRouter.get('/', async (request, response) => {
  try {

    const dddRepository = getCustomRepository(DDDRepository);

    const plano = await dddRepository.find();

    return response.json(plano);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


DDDRouter.delete('/:id', async (request, response) => {
  try {

    const dddRepository = getCustomRepository(DDDRepository);
    console.log(request.params.id);
    const DDDid = request.params.id;
    const DDD = await dddRepository.findOne({ where: { id: DDDid } });

    if (!DDD) {
      throw Error('O DDD não existe.')
    }

    await dddRepository.remove(DDD);

    return response.json(DDD);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

DDDRouter.put('/:id', async (request, response) => {
  try {
    const {
      nomeCidade,
      DDD,
    } = request.body;

    if (!DDD) {
      throw Error('Você não pode deixar o campo do DDD em branco');
    }

    const DDDId = request.params.id

    const dddRepository = getCustomRepository(DDDRepository);

    const ddd = await dddRepository.findOne({ where: { id: DDDId } });

    if (!ddd) {
      throw Error('O DDD para alteração não existe')
    }

    const dddCadastrado = await dddRepository.findOne({ where: { DDD: DDD } });

    if (!(dddCadastrado?.id === ddd.id || dddCadastrado === undefined)) {
      throw Error('O novo DDD já está cadastrado')
    }

    ddd.DDD = DDD,
      ddd.nomeCidade = nomeCidade,

      await dddRepository.save(ddd);

    return response.json(ddd);

  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default DDDRouter;
