import Database, { MODELS } from "database";

import passport = require("passport");
import { Profile } from "passport";

import { AuthTypes, IAuthUser } from "types/auth-user.type";
import { Strategy, VerifyCallback, VerifyFunction } from "passport-oauth2";

import { getPassportAuthEnv } from "src/api";
import { IUser } from "types/user.type";
import { Model } from "mongoose";

const { Auth, User } = MODELS;

/**
 * @types [AuthTypes, string, string[]?] (first, second, third)
 * @first the method of authentication
 * @second the module in passport
 * @third a scopes
 */
const defaultPassports: [AuthTypes, string, string[]?][] = [
  ["discord", "passport-discord", ["identify", "email", "guilds"]]
];

const CreateOrUpdate = async <T>({ model, findData, data }: {model: Model<T>, findData: Partial<T>, data: Partial<T>}) => {
  const finded = await model.findOne(findData);
  
  if (!finded) {
    return model.create({...findData, ...data, id: Database.generateId() })
  };

  await model.updateOne(findData, data);
  return model.findOne(findData);
};

class Authenticator {
  private readonly _passport: passport.PassportStatic;

  public constructor(passport: passport.PassportStatic) {
    this._passport = passport;
  }

  public init = () => {
    for (const passport of defaultPassports) {
      const strategy = require(passport[1]).Strategy;
      this.strategy(strategy, {
        ...getPassportAuthEnv(
          passport[0].toUpperCase() as Uppercase<AuthTypes>
        ),
        type: passport[0],
        scopes: passport[2]
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

        const username = profile.username || profile.displayName || profile.name.givenName;

        const user = (await CreateOrUpdate({ model: User, findData: { username }, data: { created_at: now }})).toObject();
        const auth = (await CreateOrUpdate({ model: Auth, findData: { service_id: id }, data: {
          profile_id: user.id,
    
          access_token,
          refresh_token,
    
          created_at: now,
          type: type
        }})).toObject();

        console.log("get", access_token);

        return done(null, {
          auth, user
        } as { auth: IAuthUser, user: IUser })
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
