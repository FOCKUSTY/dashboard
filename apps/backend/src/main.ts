import cookieParser = require("cookie-parser");

import { json, urlencoded } from "express";
import { NestFactory } from "@nestjs/core";

import Api from "api";

import { AppModule } from "./app.module";
import Passport from "./strategies";
import Session from "./app/session.app";

import connect from "database/connection";

const { env } = new Api.env();
const passport = new Passport();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: [env.CLIENT_URL], credentials: true }
  });

  new Session(app).create();

  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded());

  app.use(passport.session());
  app.use(passport.initialize());

  connect(env.MONGO_URL);

  await app.listen(env.PORT);
}

bootstrap();
