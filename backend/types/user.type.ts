import { IConfig } from "./config.type";

export interface ICreateUser {
  username: string;

  //** ISO format */
  created_at: string;
}

export interface IUser {
  id: string;

  username: string;
  nickname: string;

  avatar_url: string;

  guilds: string[];

  /** ISO format */
  created_at: string;

  /** @type {bigint} */
  settings: string;

  config: IConfig;
}
