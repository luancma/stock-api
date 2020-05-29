import User from '../infra/typeorm/entities/Users';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default interface IUserRepository {
  list(): Promise<User[] | undefined>;

  create({
    name,
    email,
    password,
  }: Omit<IUser, 'id'>): Promise<User | undefined>;

  findById({ id }: Pick<IUser, 'id'>): Promise<User | undefined>;

  delete({ id }: Pick<IUser, 'id'>): Promise<void>;
}
