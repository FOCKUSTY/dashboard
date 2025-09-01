import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from "@nestjs/core";

import { json, urlencoded } from "express";

import cookieParser = require("cookie-parser");

import Session from "./app/session.app";
import Passport from "./app/strategies";

import { AppModule } from "./app.module";
import { env } from "services/env.service";;
import connect from "database/connection";

const passport = new Passport();

(async () => {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: [env.CLIENT_URL], credentials: true }
  });

  new Session(env.SESSION_SECRET, app).create();

  connect(env.DATABASE_URL);

  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded());

  app.use(passport.session());
  app.use(passport.initialize());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(env.PORT);
})();
