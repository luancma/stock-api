import { Request, Response } from 'express';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  async store(request: Request, response: Response): Promise<any> {
    const userRepository = new UserRepository();

    const createUser = new CreateUserService(userRepository);

    const { name, email, password } = request.body;

    try {
      await createUser.execute({
        name,
        email,
        password,
      });

      const createdUser = await userRepository
        .findByEmail({ email })
        .then(value => value?.created_at);

      response.status(201).json({
        name,
        email,
        password,
        created_at: createdUser,
      });
    } catch (err) {
      response.status(400).json({
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const users = await userRepository.list();

    return response.json(users);
  }

  async delete(request: Request, response: Response): Promise<void> {
    const userRepository = new UserRepository();

    const { id } = request.body;

    const checkUser = await userRepository.findById({ id });

    if (!checkUser) {
      response.status(400).json({
        message: 'Usuário não é válido',
      });
    }

    try {
      await userRepository.delete({ id });
      response.status(200).json({
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      response.status(400).json({
        message: 'Erro ao deletar o usuário',
      });
    }
  }
}

export default UserController;
