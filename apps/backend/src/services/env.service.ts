import {
  AUTH_TYPES,
  type AuthTypes
} from "types/auth-user.type";

import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({
    path: ".env." + process.env.NODE_ENV
  });
} else {
  config();
}

export const REQUIRED = [
  "CLIENT_URL",
  
  "SESSION_SECRET",
  "HASH_KEY",
  "DATABASE_URL",
  "DISCORD_TOKEN",
  "DISCORD_API_URL"
] as const;

export const ALL = [
  ...REQUIRED,
  "ENCODING_TYPE",
  "PORT",
  "COOKIE_MAX_AGE",
  "COOKIE_TOKEN_MAX_AGE"
] as const; 

const AUTH_DATA = [
  "CLIENT_ID",
  "CLIENT_SECRET",
  "CALLBACK_URL"
] as const;

type AuthData = (typeof AUTH_DATA)[number];
export type Required = (typeof REQUIRED)[number] | `${Uppercase<AuthTypes>}_${AuthData}`;
export type All = (typeof ALL)[number];
export type Partial = Exclude<All, Required>;

const DEFAULT: Record<Partial, string> = {
  ENCODING_TYPE: "hex",
  PORT: "3001",
  COOKIE_MAX_AGE: "604800000",
  COOKIE_TOKEN_MAX_AGE: "10800000"
};

(() => {
  let isError = false;

  AUTH_DATA.forEach(data => {
    AUTH_TYPES.forEach(type => {
      if (process.env[type + "_" + data]) return;

      isError = true;
      console.log("Auth data " + data + " for type " + type + " is not defined in env");
    });
  });

  REQUIRED.forEach((key) => {
    if (process.env[key]) return;

    isError = true;
    console.log("Key " + key + " is not defined in env");
  });

  if (isError) return process.exit();
})();

export const env: Record<All, string> = {
  ...DEFAULT,
  ...process.env as Record<All, string>,
};

export const getPassportEnv = (type: Uppercase<AuthTypes>) => {
  return {
    id: env[type + "_CLIENT_ID"],
    secret: env[type + "_CLIENT_SECRET"],
    callback: env[type + "_CALLBACK_URL"]
  } as const;
};

export default env;
