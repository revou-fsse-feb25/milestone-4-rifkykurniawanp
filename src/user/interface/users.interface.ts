// src/user/interfaces/user.interface.ts
import { UserRole } from "src/user/common/user-role.enum";


export interface IUser {
  id: number;
  role: UserRole;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

