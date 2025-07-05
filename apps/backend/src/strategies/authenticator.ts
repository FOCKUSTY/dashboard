import { MODELS } from "database";

import passport = require("passport");
import { Profile } from "passport";

import { AuthTypes, IAuthUser } from "types/auth-user.type";
import { Strategy, VerifyCallback, VerifyFunction } from "passport-oauth2";

import { getPassportAuthEnv } from "env";

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

        const user = (
          await User.create({
            username:
              profile.username || profile.displayName || profile.name.givenName,
            created_at: now
          })
        ).toObject();

        const authUser = (
          await Auth.create({
            service_id: id,
            profile_id: user.id,

            access_token,
            refresh_token,

            created_at: now,
            type: type
          })
        ).toObject();

        return done(null, {
          id: authUser.id,
          profile_id: authUser.profile_id,
          service_id: authUser.service_id,

          access_token: authUser.access_token,
          refresh_token: authUser.refresh_token,

          created_at: authUser.created_at,
          type: authUser.type
        } as IAuthUser);
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
