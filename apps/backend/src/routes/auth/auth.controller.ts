import { Controller, Get, Injectable, Next, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { MODELS } from "database";
import Api from "api";

import { AUTH_CONTROLLER, AUTH_ROUTES } from "./auth.routes";

const AuthApi = Api.auth;
const Hash = Api.hash;
const { env } = new Api.env();

const { User } = MODELS;

@Injectable()
@Controller(AUTH_CONTROLLER)
export class AuthController {
  @Get()
  public printMethods() {
    const { abbreviations, methods } = AuthApi.methods;
    const toStr = (str: unknown) => JSON.stringify(str, undefined, 4);

    return {
      message: `Sorry, but you can't auth without method, try next methods:\n${toStr(methods)}\nAnd this abbreviations:\n${toStr(abbreviations)}`,
      abbreviations,
      methods
    };
  }

  @Get(AUTH_ROUTES.GET)
  public auth(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    new AuthApi(req.params.method).auth(req, res, next);

    return;
  }

  @Get(AUTH_ROUTES.GET_CALLBACK)
  public callback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    new AuthApi(req.params.method).callback(req, res, next, (...args) => {
      if (!args[1]) return;

      const { auth, user } = args[1];

      res.cookie("user", JSON.stringify({
        auth_id: auth.id,
        ...user
      }), {
        maxAge: Number(env.COOKIE_MAX_AGE),
      });
      
      res.cookie(
        `${auth.id}-${auth.profile_id}-token`,
        JSON.stringify({
          id: auth.id,
          profile_id: auth.profile_id,
          token: new Hash().execute(auth.access_token)
        }), {
          maxAge: Number(env.COOKIE_TOKEN_MAX_AGE),
        }
      );
      res.redirect(env.CLIENT_URL);
    });
  }
}
