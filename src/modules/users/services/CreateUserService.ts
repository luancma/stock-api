import IUserRepository from '../interfaces/IUserRepository';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: Omit<ICreateUser, 'id'>) {
    const checkUser = await this.userRepository.findByEmail({ email });

    if (checkUser) {
      throw new Error('Esse email já está cadastrado');
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
    });

    return {
      id: user?.id,
      name,
      email,
      password,
    };
  }
}

export default CreateUserService;
