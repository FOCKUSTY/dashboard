import "database";

import cookieParser = require("cookie-parser");

import { json, urlencoded } from "express";
import { NestFactory } from "@nestjs/core";

import Env from "env";

import { AppModule } from "./app.module";
import Passport from "./strategies";
import Session from "./app/session.app";

const env = new Env();
const passport = new Passport();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: [env.get("CLIENT_URL")], credentials: true }
  });

  new Session(app).create();

  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded());

  app.use(passport.session());
  app.use(passport.initialize());

  await app.listen(env.get("PORT", true));
}

bootstrap();
