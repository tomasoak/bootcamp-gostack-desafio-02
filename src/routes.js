import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';


const routes = new Router();

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('recipients/:id', RecipientController.delete);

export default routes; 
