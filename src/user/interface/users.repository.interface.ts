import { IUser } from './users.interface';
import { User } from '@prisma/client';

type UserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
type UserUpdateInput = Partial<UserInput>;

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  create(data: UserInput): Promise<User>;
  update(id: number, data: UserUpdateInput): Promise<User | null>;
  remove(id: number): Promise<boolean>;
}
