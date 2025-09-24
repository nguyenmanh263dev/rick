export interface IUser {
  id: number;
  username: string;
  password: string;
  fullName: string;
  //   devices: Device[];
}

export type IUserConfig = Record<string, string>;
