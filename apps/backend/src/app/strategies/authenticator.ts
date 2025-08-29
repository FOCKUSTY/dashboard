import type {
  Strategy,
  VerifyCallback,
  VerifyFunction
} from "passport-oauth2";

import type { Default__v, Document, IfAny, Model, Require_id } from "mongoose";
import type { AuthTypes, IAuthUser } from "types/auth-user.type";
import type { APIUser } from "discord.js";
import type { IUser } from "types/user.type";

import Database, { MODELS } from "database";

import passport = require("passport");
import { Profile } from "passport";

import env from "services/env.service";
import DiscordService from "services/discord.service";
import { getPassportEnv } from "services/env.service";

const { Auth, User } = MODELS;

const CreateOrUpdate = async <T>({
  model,
  findData,
  data
}: {
  model: Model<T>;
  findData: Partial<T>;
  data: Partial<T>;
}) => {
  const finded = await model.findOne(findData);

  if (!finded) {
    return model.create({ ...findData, ...data, id: Database.generateId() });
  }

  return model.findOneAndUpdate(findData, data, {
    returnDocument: "after"
  }) as Promise<IfAny<T, any, Document<unknown, object, T, object> & Default__v<Require_id<T>>>>;
};

const defaultPassports: Record<AuthTypes, { path: string; scopes: string[] }> = {
  discord: {
    path: "passport-discord",
    scopes: ["identify", "email", "guilds"]
  }
};

class Authenticator {
  private readonly _passport: passport.PassportStatic;

  public constructor(passport: passport.PassportStatic) {
    this._passport = passport;
  }

  public init = () => {
    for (const passport in defaultPassports) {
      const { path, scopes } = defaultPassports[passport];
      
      const { Strategy } = require(path);
      this.strategy(Strategy, {
        ...getPassportEnv(passport.toUpperCase() as Uppercase<AuthTypes>),
        type: path,
        scopes: scopes
      });
    }
  };

  protected verify<Done extends (...data: unknown[]) => void = VerifyCallback>(
    type: AuthTypes
  ) {
    return async (
      access_token: string,
      refresh_token: string,
      profile: Profile,
      done: Done
    ) => {
      try {
        const { id } = profile;
        const now = new Date().toISOString();

        const username =
          profile.username || profile.name?.givenName || profile.displayName;

        let user: IUser;
        try {
          const apiUser: APIUser = await (
            await fetch(env.DISCORD_API_URL + "/users/@me", {
              method: "GET",
              headers: DiscordService.getUserAuth(access_token)
            })
          ).json();

          user = (
            await CreateOrUpdate({
              model: User,
              findData: { username },
              data: {
                created_at: now,
                nickname: apiUser.global_name || undefined,
                guilds: (
                  await DiscordService.fetchUserGuilds(access_token)
                ).data.map((guild) => guild.id),
                avatar_url: DiscordService.fetchUserAvatar({
                  id: apiUser.id,
                  avatar: apiUser.avatar || undefined
                }) || undefined
              }
            })
          ).toObject();
        } catch {
          user = (
            await CreateOrUpdate({
              model: User,
              findData: { username },
              data: { created_at: now }
            })
          ).toObject();
        }

        const auth = (
          await CreateOrUpdate({
            model: Auth,
            findData: { service_id: id },
            data: {
              profile_id: user.id,

              access_token,
              refresh_token,

              created_at: now,
              type: type
            }
          })
        ).toObject();

        return done(null, {
          auth,
          user
        } as { auth: IAuthUser; user: IUser });
      } catch (error) {
        console.log(error);

        return done(error, null);
      }
    };
  }

  protected strategy(
    strategy: new (
      options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
      },
      verify: VerifyFunction
    ) => Strategy,
    api: {
      id: string;
      secret: string;
      callback: string;
      scopes?: string[];
      type: AuthTypes;
      authURL?: string;
      tokenURL?: string;
    }
  ) {
    this._passport.use(
      new strategy(
        {
          clientID: api.id,
          clientSecret: api.secret,
          callbackURL: api.callback,
          scope: api.scopes
        },
        this.verify(api.type)
      )
    );
  }
}

export default Authenticator;
