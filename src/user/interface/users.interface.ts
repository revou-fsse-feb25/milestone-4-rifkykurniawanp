import { UserRole } from '@prisma/client';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;     
  role: UserRole;
  isActive: boolean;   
  createdAt: Date;
  updatedAt: Date;
}
