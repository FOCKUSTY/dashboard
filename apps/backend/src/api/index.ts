import AuthApi from "./auth.api";
import Env from "./env";

import { getPassportAuthEnv, getPassportAuth } from "./passport";

export { Env, getPassportAuth, getPassportAuthEnv };

export class Api {
  public static env = Env;
  public static auth = AuthApi;
};

export default Api;