import { IUser } from "./user";

export interface IChat {
  content: string;
  fromSelf?: boolean;
  from?: IUser;
  to?: IUser;
}
