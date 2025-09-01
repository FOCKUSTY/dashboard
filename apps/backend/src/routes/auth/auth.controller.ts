import type { NextFunction, Request, Response } from "express";

import { Controller, Get, Injectable, Next, Req, Res } from "@nestjs/common";

import { ROUTE, ROUTES } from "./auth.routes";

import env from "services/env.service";
import Hash from "services/hash.service";
import AuthApi from "services/auth.service";

const THIRTY_MUNITES = 1000 * 60 * 30;
const getRevalidateTime = (date: number) => {
  return date + Number(env.COOKIE_TOKEN_MAX_AGE) - THIRTY_MUNITES;
}

@Injectable()
@Controller(ROUTE)
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

  @Get(ROUTES.GET)
  public auth(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    new AuthApi(req.params.method).auth(req, res, next);

    return;
  }

  @Get(ROUTES.GET_CALLBACK)
  public callback(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    new AuthApi(req.params.method).callback(req, res, next, (...args) => {
      const data = args[1];

      if (!data) return;

      const { auth, user } = data;
      const domain = req.hostname;

      res.cookie(
        "user",
        JSON.stringify({
          ...user
        }),
        {
          maxAge: Number(env.COOKIE_MAX_AGE),
          domain
        }
      );

      res.cookie(
        "auth-data",
        JSON.stringify({
          auth_id: auth.id,
          profile_id: auth.profile_id
        }),
        {
          domain
        }
      );

      res.cookie(
        `${auth.id}-${auth.profile_id}-token`,
        JSON.stringify({
          id: auth.id,
          profile_id: auth.profile_id,
          token: new Hash().execute(auth.access_token),
          revalidate: getRevalidateTime(new Date().getTime())
        }),
        {
          maxAge: Number(env.COOKIE_TOKEN_MAX_AGE),
          domain
        }
      );
      res.redirect(env.CLIENT_URL);
    });
  }
}
