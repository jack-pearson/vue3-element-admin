import { PageInfo } from "@/types";
type sexType = "null" | "man" | "girl";
export interface User {
  account?: string;
  token?: string;
  password?: string;
  name?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  age?: number;
  sex?: sexType;
  [key: string]: any;
}

export interface userStoreTypes {
  userInfo: User;
}

export type UserList = PageInfo & {
  list: User[];
};
