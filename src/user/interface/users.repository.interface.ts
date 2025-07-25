
import { User } from '@prisma/client';
export type UserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdateInput = Partial<UserInput>;

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  
  create(data: UserInput): Promise<User>;
  update(id: number, data: UserUpdateInput): Promise<User | null>;
  remove(id: number): Promise<boolean>;
}
