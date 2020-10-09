// src/routes/index.ts
import { Router } from 'express';
import planoRouter from './plano.routes';
import DDDRouter from './DDD.routes';
import LIGACAO from './LIGACAO.routes';
import ligacao_plano from './LIGACAO_PLANO.routes'


const routes = Router();

routes.use('/plano', planoRouter);
routes.use('/ddd', DDDRouter);
routes.use('/ligacao', LIGACAO);
routes.use('/ligacaoplano', ligacao_plano);


export default routes;
