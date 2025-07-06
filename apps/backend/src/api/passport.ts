import { AuthTypes } from "types/auth-user.type";

import Env from "./env";

const { env } = new Env();

const getPassportAuth = (type: Uppercase<AuthTypes>) => {
  return {
    id: (type + "_CLIENT_ID") as `${Uppercase<AuthTypes>}_CLIENT_ID`,
    secret: (type +
      "_CLIENT_SECRET") as `${Uppercase<AuthTypes>}_CLIENT_SECRET`,
    callback: (type +
      "_CALLBACK_URL") as `${Uppercase<AuthTypes>}_CALLBACK_URL`,
    api: (type + "_API_URL") as `${Uppercase<AuthTypes>}_API_URL`
  } as const;
};

const getPassportAuthEnv = (type: Uppercase<AuthTypes>) => {
  const data = getPassportAuth(type);

  return {
    id: env[data.id],
    secret: env[data.secret],
    callback: env[data.callback],
    api: env[data.api]
  } as const;
};

export { getPassportAuth, getPassportAuthEnv };
