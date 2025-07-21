import AuthApi from "./auth.api";
import DiscordApi from "./discord.api";
import Hash from "./hash.api";
import Env from "./env";

import { useCache } from "./cache.api";
import { createError, createUnknownError } from "./create-error";
import { getPassportAuthEnv, getPassportAuth } from "./passport";

export { Env, getPassportAuth, getPassportAuthEnv };

export class Api {
  public static env = Env;
  public static auth = AuthApi;
  public static hash = Hash;
  public static discord = DiscordApi;
  public static useCache = useCache;

  public static createError = createError;
  public static createUnknownError = createUnknownError;
}

export default Api;
