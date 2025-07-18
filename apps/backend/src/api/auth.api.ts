import { Next, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import passport = require("passport");

import { AUTH_TYPES, AuthTypes, IAuthUser } from "types/auth-user.type";
import { IUser } from "types/user.type";

const abbreviations: Map<string, AuthTypes> = new Map([]);

class AuthApi {
  private readonly _method: string;

  public constructor(method: string) {
    this._method = method;
  }

  static get methods(): Record<"abbreviations" | "methods", readonly string[]> {
    return {
      abbreviations: Array.from(abbreviations.keys()),
      methods: AUTH_TYPES
    };
  }

  private getMethod(): [
    boolean,
    { [key: string]: unknown; method: string; body: unknown }
  ] {
    if (!(AUTH_TYPES as unknown as string[]).includes(this._method)) {
      if (abbreviations.get(this._method))
        return [true, { body: null, method: abbreviations.get(this._method) }];

      return [
        false,
        {
          body: {
            msg: "Sorry, but method " + this._method + " not found. Try next:",
            methods: AUTH_TYPES
          },
          method: this._method
        }
      ];
    }
    return [true, { body: null, method: this._method }];
  }

  public auth(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) return res.send(body);

    passport.authenticate(method)(req, res, next);

    return;
  }

  public callback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    callback: (
      ...args: [unknown, { auth: IAuthUser; user: IUser } | null, unknown]
    ) => unknown
  ): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) return res.send(body);

    passport.authenticate(method, callback)(req, res, next);

    return;
  }
}

export default AuthApi;
