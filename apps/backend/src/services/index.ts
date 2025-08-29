import AuthApi from "./auth.service";
import DiscordApi from "./discord.service";
import Hash from "./hash.service";
import env from "./env.service";  

import { createError, createUnknownError } from "./error.service";

export class Services {
  public static env = env;
  public static auth = AuthApi;
  public static hash = Hash;
  public static discord = DiscordApi;

  public static createError = createError;
  public static createUnknownError = createUnknownError;
}

export default Services;
