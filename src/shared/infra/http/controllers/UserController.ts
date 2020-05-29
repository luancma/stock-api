import { Request, Response } from 'express';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const { name, email, password } = request.body;

    const { id, created_at } = await userRepository.create({
      name,
      email,
      password,
    });

    return response.status(201).json({
      id,
      name,
      email,
      password,
      created_at,
    });
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
