import { Repository, getRepository } from 'typeorm';
import User from '../entities/Users';
import IUserRepository, {
  IUser,
} from '@modules/users/interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById({ id }: Pick<IUser, 'id'>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.find({
      select: ['id', 'name', 'email', 'created_at'],
    });

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: Omit<IUser, 'id'>): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async delete({ id }: Pick<IUser, 'id'>): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserRepository;
