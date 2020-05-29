import { Router } from 'express';
import UserController from '@shared/infra/http/controllers/UserController';

const userRouteres = Router();
const userController = new UserController();

userRouteres.post('/create', userController.store);
userRouteres.get('/list', userController.index);
userRouteres.delete('/delete', userController.delete);

export default userRouteres;
