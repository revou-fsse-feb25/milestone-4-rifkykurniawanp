import { IUser } from 'src/user/interface/users.interface';
import { AccountRole } from '../common/account-role.enum';
export interface IAccount {
  id: number;
  type: AccountRole;
  balance: number;
  userId: number;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
