import { Router } from 'express';
import userRouteres from '@modules/users/infra/routes/user.routers';

const routes = Router();

routes.use('/users', userRouteres);

export default routes;
