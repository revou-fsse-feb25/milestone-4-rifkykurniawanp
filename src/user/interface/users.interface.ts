import { UserRole } from '../common/user-role.enum';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}