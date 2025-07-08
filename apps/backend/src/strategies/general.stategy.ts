import { MODELS } from "database/schemas";

import passport = require("passport");

import Authenticator from "./authenticator";
import { IAuthUser } from "types/auth-user.type";
import { IUser } from "types/user.type";

const { Auth, User } = MODELS;

class GeneralStrategy {
  protected readonly _passport: passport.PassportStatic = passport;
  private readonly _authenticator: Authenticator;

  public constructor() {
    this.serializer();

    this._authenticator = new Authenticator(this._passport);
  }

  public readonly initialize = () => {
    return this._passport.initialize();
  };

  public readonly session = () => {
    return this._passport.session();
  };

  public get passport() {
    return this._passport;
  }

  public get auth(): Authenticator {
    return this._authenticator;
  }

  private serializer() {
    this._passport.serializeUser((user: { auth: IAuthUser, user: IUser}, done) => {
      return done(null, user);
    });

    this._passport.deserializeUser(async (u: string, done) => {
      try {
        const auth = (await Auth.findOne({ id: u })).toObject();
        const user = (await User.findOne({id: auth.profile_id})).toObject();

        return user
          ? done(null, { auth, user } as { auth: IAuthUser, user: IUser })
          : done(null, null);
      } catch (err) {
        console.error(err);

        return done(err, null);
      }
    });
  }
}

export default GeneralStrategy;
