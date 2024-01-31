export type UserRoleT = "user" | "admin";

export interface UserT {
  name: string;
  email: string;
  password: string;
  role: UserRoleT;
  createdAt: Date;
  validated: boolean;
}

export type UserData = UserT | null;

export interface AuthData {
  user: UserData;
  token: string;
}
