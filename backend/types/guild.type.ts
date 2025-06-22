import { IConfig } from "./config.type";

export interface ICreateGuild {
  name: string;
  owner_id: string;
  created_at: string;
  members: string[];
};

export interface IGuild {
  id: string;
  name: string;
  icon_url: string;
  
  created_at: string;
  owner_id: string;

  members: string[];

  /** @type {bigint} */
  settings: string;
  config: {
    guild: IConfig["guild"],
    logging: IConfig["logging"]
  };
};