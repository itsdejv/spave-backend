import express from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../build/swagger.json';
import { RegisterRoutes } from './generated/routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, async (_req: any, res: any) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

app.get('/swagger-json', (_req, res) => {
  res.json(swaggerDocument);
});

app.use(authMiddleware);

RegisterRoutes(app);

app.use(errorHandler);

export default app;
