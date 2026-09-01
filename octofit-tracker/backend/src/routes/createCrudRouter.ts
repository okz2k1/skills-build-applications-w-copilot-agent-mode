import { Router } from 'express';
import { Model } from 'mongoose';

export function createCrudRouter(model: Model<any>): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const document = await model.findById(request.params.id).lean();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      response.status(201).json(await model.create(request.body));
    } catch (error) {
      next(error);
    }
  });

  return router;
}