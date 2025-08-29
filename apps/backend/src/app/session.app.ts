import { INestApplication } from "@nestjs/common";
import { Express } from "express";

class Session {
  private readonly _secret: string;
  private readonly _app: INestApplication<unknown> | Express;

  private readonly _resave: boolean = false;
  private readonly _save_uninitialized: boolean = false;

  private readonly _cookie: { maxAge: number } = {
    maxAge: 60000 * 60 * 24 * 7
  };

  constructor(
    secret: string,
    app: INestApplication<unknown> | Express,
    data?: {
      resave?: boolean;
      saveUninitialized?: boolean;
      cookie?: { maxAge: number };
      mongoUrl?: string;
    }
  ) {
    this._secret = secret;
    this._app = app;

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
