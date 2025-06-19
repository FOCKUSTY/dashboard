import Env from "env";

import { INestApplication } from "@nestjs/common";
import { Express } from "express";

const env = new Env();

class Session {
  private readonly _secret: string = env.get("SESSION_SECRET");
  private readonly _app: INestApplication<unknown> | Express;

  private readonly _resave: boolean = false;
  private readonly _save_uninitialized: boolean = false;

  private readonly _cookie: { maxAge: number } = {
    maxAge: Number(env.get("COOKIE_MAX_AGE", true))
  };

  constructor(
    app: INestApplication<unknown> | Express,
    secret?: string,
    data?: {
      resave?: boolean;
      saveUninitialized?: boolean;
      cookie?: { maxAge: number };
    }
  ) {
    this._app = app;

    this._secret = this._secret || secret;
    this._resave = data?.resave || this._resave;
    this._save_uninitialized = data?.saveUninitialized || this._save_uninitialized;
    this._cookie = data?.cookie || this._cookie;
  }

  public create() {
    this._app.use(
      require("express-session")({
        secret: this._secret,
        resave: this._resave,
        saveUninitialized: this._save_uninitialized,
        cookie: this._cookie,
      })
    );
  }
}

export default Session;
