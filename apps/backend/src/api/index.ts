import AuthApi from "./auth.api";
import { useCache } from "./cache.api";
import Env from "./env";
import Hash from "./hash.api";

import { getPassportAuthEnv, getPassportAuth } from "./passport";

export { Env, getPassportAuth, getPassportAuthEnv };

export class Api {
  public static env = Env;
  public static auth = AuthApi;
  public static hash = Hash;
  public static useCache = useCache;
}

export default Api;
